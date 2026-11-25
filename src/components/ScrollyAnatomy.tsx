import { useEffect, useRef, useState } from 'react';
import { TOTAL_FRAMES, computeScrollProgress, computeScrollyVals } from '../utils/duneLogic';

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(3, '0');
  return `/dune-frames/frame_${num}.webp`;
}

export function ScrollyAnatomy() {
  const [scrollP, setScrollP] = useState<number>(0);
  const [manualP, setManualP] = useState<number | null>(null);
  const pRef = useRef<number>(0);
  const scrollyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const targetFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const tweenRafRef = useRef<number>(0);

  const vals = computeScrollyVals(scrollP, manualP);
  targetFrameRef.current = vals.frameIndex;

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[index];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset >= 0 ? images[index - offset] : null;
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = index + offset < TOTAL_FRAMES ? images[index + offset] : null;
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    renderedFrameRef.current = index;
  };

  useEffect(() => {
    let rafId = 0;

    const measure = () => {
      const el = scrollyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const p = computeScrollProgress(r.top, r.height, vh);
      if (Math.abs(p - pRef.current) > 0.001) {
        pRef.current = p;
        setScrollP(p);
        setManualP(null);
      }
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        measure();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    measure();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.round(rect.width * dpr);
      const nextH = Math.round(rect.height * dpr);
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
        drawFrame(targetFrameRef.current);
      }
    };

    syncCanvasSize();
    const observer = new ResizeObserver(syncCanvasSize);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadIndex = (index: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || imagesRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[index] = img;
            if (renderedFrameRef.current === -1 || index === targetFrameRef.current) {
              drawFrame(targetFrameRef.current);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = getFrameSrc(index);
      });

    const priority: number[] = [];
    const rest: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i === 0 || i === TOTAL_FRAMES - 1 || i % 8 === 0) {
        priority.push(i);
      } else {
        rest.push(i);
      }
    }

    const runQueue = async (indices: number[], concurrency: number) => {
      let cursor = 0;
      const worker = async () => {
        while (!cancelled && cursor < indices.length) {
          const idx = indices[cursor++];
          await loadIndex(idx);
        }
      };
      await Promise.all(Array.from({ length: concurrency }, worker));
    };

    void runQueue(priority, 6).then(() => runQueue(rest, 6));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (tweenRafRef.current) {
      cancelAnimationFrame(tweenRafRef.current);
      tweenRafRef.current = 0;
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (manualP === null || reducedMotion || renderedFrameRef.current === -1) {
      drawFrame(vals.frameIndex);
      return;
    }

    const step = () => {
      const current = renderedFrameRef.current;
      const target = targetFrameRef.current;
      if (current === target) {
        tweenRafRef.current = 0;
        return;
      }
      const diff = target - current;
      const delta = Math.abs(diff) <= 2 ? diff : Math.sign(diff) * Math.ceil(Math.abs(diff) * 0.25);
      drawFrame(current + delta);
      tweenRafRef.current = requestAnimationFrame(step);
    };

    tweenRafRef.current = requestAnimationFrame(step);

    return () => {
      if (tweenRafRef.current) {
        cancelAnimationFrame(tweenRafRef.current);
        tweenRafRef.current = 0;
      }
    };
  }, [vals.frameIndex, manualP]);

  return (
    <section
      id="anatomy"
      aria-label="Подача кофе"
      style={{
        borderTop: '1px solid #2E2A27',
        borderBottom: '1px solid #2E2A27',
        background: '#0F0F11',
      }}
    >
      <div id="scrolly" ref={scrollyRef} style={{ height: '1900px' }}>
        <div className="scrolly-inner">
          <div className="wrap" style={{ height: '100%' }}>
            <div className="scrolly-grid">
              <div>
                <p className="kicker">Подача кофе</p>
                <h2 className="h2" style={{ marginTop: '16px' }}>
                  От первой капли до полной чашки
                </h2>
                <div aria-live="polite" style={{ marginTop: '28px', minHeight: '112px' }}>
                  <div className="mono" style={{ fontSize: '13px', color: '#C8A97E' }}>
                    {vals.stage.num} / 03
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: '28px',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      marginTop: '6px',
                    }}
                  >
                    {vals.stage.title}
                  </div>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.55,
                      color: '#9C948B',
                      margin: '8px 0 0',
                      maxWidth: '44ch',
                    }}
                  >
                    {vals.stage.text}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                  {vals.steps.map((s) => (
                    <button
                      key={s.n}
                      type="button"
                      className="btn"
                      onClick={() => setManualP(s.center)}
                      aria-pressed={s.active}
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        minHeight: '44px',
                        padding: '0 20px',
                        borderRadius: '9999px',
                        background: 'transparent',
                        fontSize: '14px',
                        fontWeight: 500,
                        border: `1px solid ${s.border}`,
                        color: s.color,
                      }}
                    >
                      <span className="mono" style={{ fontSize: '12px', color: '#C8A97E' }}>
                        {s.n}
                      </span>
                      {s.label}
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          height: '2px',
                          background: '#C8A97E',
                          width: `${s.bar}%`,
                        }}
                      ></span>
                    </button>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    letterSpacing: '.01em',
                    color: '#9C948B',
                    margin: '20px 0 0',
                  }}
                >
                  Прокручивайте вниз — стакан наполнится сам.
                </p>
              </div>

              <div className="scrolly-art" style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  className="scrolly-canvas-frame"
                  style={{
                    position: 'relative',
                    height: 'min(640px, 78vh)',
                    aspectRatio: '9 / 16',
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    className="scrolly-canvas"
                    role="img"
                    aria-label="Свежий кофе наливается в стеклянный стакан по мере прокрутки страницы"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
