import { useEffect, useRef, useState } from 'react';
import { computeScrollProgress, computeScrollyVals } from '../utils/duneLogic';

export function ScrollyAnatomy() {
  const [scrollP, setScrollP] = useState<number>(1);
  const [manualP, setManualP] = useState<number | null>(null);
  const pRef = useRef<number>(1);
  const scrollyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const measure = () => {
      const el = scrollyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const p = computeScrollProgress(r.top, r.height, vh);
      if (Math.abs(p - pRef.current) > 0.002) {
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

    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    measure();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const vals = computeScrollyVals(scrollP, manualP);

  return (
    <section
      id="anatomy"
      aria-label="Анатомия фильтр-кофе"
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
                <p className="kicker">Анатомия фильтра</p>
                <h2 className="h2" style={{ marginTop: '16px' }}>
                  Чистая чашка собирается слой за слоем
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
                  Прокручивайте вниз — чашка соберётся сама.
                </p>
              </div>

              <div className="scrolly-art" style={{ display: 'flex', justifyContent: 'center' }}>
                <svg
                  viewBox="0 0 480 480"
                  role="img"
                  aria-label="Фильтр-кофе: чашка, экстракция и тепло появляются по мере прокрутки"
                  style={{ width: '100%', maxWidth: '560px', height: 'auto', display: 'block' }}
                >
                  <defs>
                    <mask id="ringMask">
                      <rect width="480" height="480" fill="#000"></rect>
                      <circle
                        cx="240"
                        cy="240"
                        r="212"
                        pathLength={60}
                        transform="rotate(-90 240 240)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="16"
                        style={{
                          strokeDasharray: `${vals.ringLit} 100`,
                          transition: 'stroke-dasharray .2s linear',
                        }}
                      ></circle>
                    </mask>
                  </defs>
                  {/* dot ring */}
                  <circle
                    cx="240"
                    cy="240"
                    r="212"
                    pathLength={60}
                    transform="rotate(-90 240 240)"
                    fill="none"
                    stroke="#2E2A27"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ strokeDasharray: '0.01 0.99' }}
                  ></circle>
                  <circle
                    cx="240"
                    cy="240"
                    r="212"
                    pathLength={60}
                    transform="rotate(-90 240 240)"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    mask="url(#ringMask)"
                    style={{ strokeDasharray: '0.01 0.99' }}
                  ></circle>
                  {/* stage 1: ceramic mug */}
                  <g
                    style={{
                      opacity: vals.mugO,
                      transform: `translateY(${vals.mugY}px)`,
                      transition: 'opacity .2s linear, transform .2s linear',
                    }}
                  >
                    <ellipse
                      cx="240"
                      cy="378"
                      rx="128"
                      ry="15"
                      fill="#1A1715"
                      stroke="#3C3631"
                      strokeWidth="1.5"
                    ></ellipse>
                    <path
                      d="M326 240 C388 238 388 330 318 330"
                      fill="none"
                      stroke="#3C3631"
                      strokeWidth="16"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M326 240 C388 238 388 330 318 330"
                      fill="none"
                      stroke="#24201D"
                      strokeWidth="12"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M152 208 V326 Q152 374 200 374 H280 Q328 374 328 326 V208 Z"
                      fill="#24201D"
                      stroke="#3C3631"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M166 234 V320"
                      stroke="#C8A97E"
                      strokeOpacity=".28"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                    <ellipse
                      cx="240"
                      cy="208"
                      rx="88"
                      ry="22"
                      fill="#2E2A27"
                      stroke="#3C3631"
                      strokeWidth="1.5"
                    ></ellipse>
                    <ellipse cx="240" cy="208" rx="76" ry="17" fill="#0E0D0C"></ellipse>
                    <ellipse
                      cx="240"
                      cy="208"
                      rx="88"
                      ry="22"
                      fill="none"
                      stroke="#C8A97E"
                      strokeWidth="1.5"
                      style={{ opacity: vals.rimO, transition: 'opacity .2s linear' }}
                    ></ellipse>
                  </g>
                  {/* stage 2: extraction */}
                  <g
                    style={{
                      opacity: vals.cofO,
                      transform: `scale(${vals.cofS})`,
                      transformOrigin: '240px 208px',
                      transition: 'opacity .2s linear, transform .2s linear',
                    }}
                  >
                    <ellipse cx="240" cy="208" rx="76" ry="17" fill="#3A2415"></ellipse>
                    <ellipse
                      cx="240"
                      cy="208"
                      rx="58"
                      ry="12"
                      fill="none"
                      stroke="#C8A97E"
                      strokeOpacity=".35"
                    ></ellipse>
                  </g>
                  <g
                    style={{
                      opacity: vals.drpO,
                      transform: `translateY(${vals.drpY}px)`,
                      transition: 'opacity .2s linear, transform .2s linear',
                    }}
                  >
                    <path
                      d="M176 104 H304 L268 172 H212 Z"
                      fill="#1A1715"
                      stroke="#C8A97E"
                      strokeOpacity=".7"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M168 104 H312"
                      stroke="#C8A97E"
                      strokeOpacity=".7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M198 114 L222 168 M240 112 V170 M282 114 L258 168"
                      stroke="#3C3631"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M240 176 V204"
                      pathLength={1}
                      fill="none"
                      stroke="#C8A97E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: vals.strO,
                        transition: 'stroke-dashoffset .2s linear',
                      }}
                    ></path>
                  </g>
                  {/* stage 3: heat */}
                  <ellipse
                    cx="240"
                    cy="208"
                    rx="102"
                    ry="27"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="1"
                    style={{ opacity: vals.h1, transition: 'opacity .2s linear' }}
                  ></ellipse>
                  <ellipse
                    cx="240"
                    cy="208"
                    rx="118"
                    ry="33"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="1"
                    style={{ opacity: vals.h2, transition: 'opacity .2s linear' }}
                  ></ellipse>
                  <ellipse
                    cx="240"
                    cy="208"
                    rx="134"
                    ry="39"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="1"
                    style={{ opacity: vals.h3, transition: 'opacity .2s linear' }}
                  ></ellipse>
                  <path
                    d="M222 176 C206 152, 240 140, 224 112 C216 98, 232 88, 226 74"
                    pathLength={1}
                    fill="none"
                    stroke="#EDE8E1"
                    strokeOpacity=".55"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: vals.sA,
                      transition: 'stroke-dashoffset .2s linear',
                    }}
                  ></path>
                  <path
                    d="M240 172 C226 146, 258 132, 244 104 C238 88, 252 78, 246 62"
                    pathLength={1}
                    fill="none"
                    stroke="#EDE8E1"
                    strokeOpacity=".55"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: vals.sB,
                      transition: 'stroke-dashoffset .2s linear',
                    }}
                  ></path>
                  <path
                    d="M258 176 C244 156, 274 142, 262 118 C256 104, 270 94, 264 80"
                    pathLength={1}
                    fill="none"
                    stroke="#EDE8E1"
                    strokeOpacity=".55"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: vals.sC,
                      transition: 'stroke-dashoffset .2s linear',
                    }}
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
