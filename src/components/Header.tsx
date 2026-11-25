import { DuneLogo } from './DuneLogo';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: '#121214',
        borderBottom: '1px solid #2E2A27',
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          height: '72px',
        }}
      >
        <a
          href="#top"
          aria-label="Дюна — на главную"
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <DuneLogo width={62} height={24} />
          <span
            className="serif"
            style={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '.2em',
              lineHeight: 1,
            }}
          >
            ДЮНА
          </span>
        </a>
        <nav
          className="nav-links"
          aria-label="Основная навигация"
          style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
        >
          <a className="navlink" href="#concept">
            Концепция
          </a>
          <a className="navlink" href="#menu">
            Меню
          </a>
          <a className="navlink" href="#locations">
            Кофейни
          </a>
          <a className="navlink" href="#zelenogradsk">
            Зеленоградск 2027
          </a>
        </nav>
        <div
          className="badge-top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #2E2A27',
            borderRadius: '9999px',
            padding: '8px 14px',
            fontSize: '12px',
            letterSpacing: '.01em',
            color: '#EDE8E1',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '9999px',
              background: '#C8A97E',
            }}
          ></span>
          Калининград — Зеленоградск
        </div>
      </div>
    </header>
  );
}
