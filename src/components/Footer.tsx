import { DuneLogo } from './DuneLogo';

export function Footer() {
  return (
    <footer style={{ background: '#0C0C0E', borderTop: '1px solid #2E2A27' }}>
      <div className="wrap" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <div className="foot-grid">
          <div>
            <a
              href="#top"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
              aria-label="Дюна — наверх"
            >
              <DuneLogo width={56} height={22} />
              <span
                className="serif"
                style={{
                  fontSize: '22px',
                  fontWeight: 500,
                  letterSpacing: '.2em',
                  lineHeight: 1,
                }}
              >
                ДЮНА
              </span>
            </a>
            <p
              className="serif"
              style={{
                fontSize: '20px',
                lineHeight: 1.3,
                color: '#9C948B',
                margin: '16px 0 0',
              }}
            >
              Тихо работает.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
            }}
          >
            <a
              href="https://t.me/"
              className="navlink"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '24px',
              }}
            >
              Telegram
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </a>
            <a id="privacy" href="#privacy" className="navlink">
              Политика конфиденциальности
            </a>
          </div>

          <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#9C948B' }}>
            ООО «Дюна Кофе Лаб»
            <br />
            ИНН 3906384912 · ОГРН 1213900008451
            <br />
            236022, Калининград, пр-т Мира, д. 41, помещ. 1
          </div>
        </div>

        <div
          style={{
            marginTop: '48px',
            paddingTop: '20px',
            borderTop: '1px solid #2E2A27',
            fontSize: '12px',
            letterSpacing: '.01em',
            color: '#9C948B',
          }}
        >
          © 2026 Дюна. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
