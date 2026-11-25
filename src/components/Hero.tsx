import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

const DUNE_PATHS = [
  { d: 'M-20 44 C 260 4, 520 70, 760 28 S 1180 -8, 1460 40', opacity: 0.1 },
  { d: 'M-20 62 C 240 22, 540 90, 780 50 S 1160 14, 1460 60', opacity: 0.14 },
  { d: 'M-20 94 C 280 40, 500 118, 740 72 S 1200 28, 1460 86', opacity: 0.18 },
  { d: 'M-20 112 C 220 74, 560 138, 800 94 S 1140 62, 1460 108', opacity: 0.22 },
  { d: 'M-20 146 C 300 92, 480 166, 720 122 S 1220 84, 1460 132', opacity: 0.26 },
  { d: 'M-20 164 C 260 124, 540 190, 780 148 S 1160 112, 1460 156', opacity: 0.3 },
  { d: 'M-20 192 C 240 148, 520 214, 760 174 S 1200 136, 1460 184', opacity: 0.34 },
  { d: 'M-20 216 C 280 180, 500 240, 740 200 S 1180 166, 1460 208', opacity: 0.4 },
  { d: 'M-20 242 C 260 208, 540 268, 780 226 S 1160 194, 1460 234', opacity: 0.46 },
] as const;

const SPREAD_STEP_PX = 8;

function DuneContourLine({
  d,
  opacity,
  offsetFactor,
  scrollY,
  maxScroll,
  prefersReducedMotion,
}: {
  d: string;
  opacity: number;
  offsetFactor: number;
  scrollY: MotionValue<number>;
  maxScroll: number;
  prefersReducedMotion: boolean | null;
}) {
  const y = useTransform(
    scrollY,
    [0, maxScroll],
    [0, prefersReducedMotion ? 0 : offsetFactor * SPREAD_STEP_PX]
  );

  return (
    <motion.path
      d={d}
      strokeOpacity={opacity}
      vectorEffect="non-scaling-stroke"
      style={{ y }}
    />
  );
}

export function Hero() {
  const linesRef = useRef<HTMLDivElement | null>(null);
  const [maxScroll, setMaxScroll] = useState(760);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateMaxScroll = () => {
      const el = linesRef.current;
      if (!el) return;
      const bottomOffset = el.getBoundingClientRect().bottom + window.scrollY;
      setMaxScroll(Math.max(Math.round(bottomOffset), 1));
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll, { passive: true });
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  return (
    <section id="concept" style={{ position: 'relative' }}>
      <div className="wrap hero-pad" style={{ paddingTop: '104px' }}>
        <p className="kicker rise">Дюна · Тихо работает</p>
        <h1
          className="serif rise"
          style={{
            animationDelay: '80ms',
            fontWeight: 400,
            fontSize: 'clamp(2.5rem,6vw,4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '20px 0 0',
            maxWidth: '15em',
            color: '#EDE8E1',
          }}
        >
          Тихо работает.{' '}
          <span style={{ color: '#9C948B' }}>
            Кофейня, созданная разработчиками для глубокой работы
          </span>
        </h1>
        <p
          className="rise"
          style={{
            animationDelay: '160ms',
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#9C948B',
            maxWidth: '520px',
            margin: '28px 0 0',
          }}
        >
          Вдохновлено Куршской косой: песок, ветер, тишина. Розетка у каждого стола, без громкой музыки и резких запахов еды.
        </p>
        <div
          className="rise"
          style={{
            animationDelay: '240ms',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px 20px',
            marginTop: '36px',
          }}
        >
          <a
            className="cta"
            href="#zelenogradsk"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span
              className="cta-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '48px',
                padding: '0 24px',
                borderRadius: '9999px',
                background: '#C8A97E',
                color: '#121214',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Открытие в Зеленоградске
            </span>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                background: '#C8A97E',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#121214"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
          </a>
          <a
            className="btn ghost"
            href="#locations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '48px',
              padding: '0 24px',
              borderRadius: '9999px',
              border: '1px solid #EDE8E1',
              color: '#EDE8E1',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Смотреть кофейни
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M6 13l6 6 6-6"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* dune contour band */}
      <div
        ref={linesRef}
        aria-hidden="true"
        style={{
          marginTop: '20px',
          paddingTop: '8px',
          height: '324px',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '260px', overflow: 'visible' }}
          fill="none"
          stroke="#C8A97E"
          strokeWidth="1"
        >
          {DUNE_PATHS.map((line, index) => (
            <DuneContourLine
              key={line.d}
              d={line.d}
              opacity={line.opacity}
              offsetFactor={index}
              scrollY={scrollY}
              maxScroll={maxScroll}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </svg>
      </div>

      <div className="wrap" style={{ paddingTop: '16px', paddingBottom: '88px' }}>
        <div className="feats">
          <div
            className="rise"
            style={{
              animationDelay: '300ms',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px 0',
              borderBottom: '1px solid #2E2A27',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                border: '1px solid #2E2A27',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A97E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                <path d="M9.5 9.5v2M14.5 9.5v2M10 15.5h4"></path>
              </svg>
            </span>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Розетка у каждого стола</div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#9C948B' }}>
              Ноутбук заряжается там, где вы работаете.
            </div>
          </div>

          <div
            className="rise"
            style={{
              animationDelay: '360ms',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px 0',
              borderBottom: '1px solid #2E2A27',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                border: '1px solid #2E2A27',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A97E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z"></path>
                <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5"></path>
              </svg>
            </span>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Без громкой музыки</div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#9C948B' }}>
              Фоновый звук не мешает думать.
            </div>
          </div>

          <div
            className="rise"
            style={{
              animationDelay: '420ms',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px 0',
              borderBottom: '1px solid #2E2A27',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                border: '1px solid #2E2A27',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A97E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9h10a2.5 2.5 0 1 0-2.5-2.5M3 14h14a2.5 2.5 0 1 1-2.5 2.5M3 19h6"></path>
              </svg>
            </span>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Без резких запахов</div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#9C948B' }}>
              Еда, которая не пахнет на весь зал.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
