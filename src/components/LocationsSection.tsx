import { getLocationsList } from '../utils/duneLogic';

export function LocationsSection() {
  const locs = getLocationsList();

  return (
    <section
      id="locations"
      className="sec"
      style={{ padding: '96px 0', borderTop: '1px solid #2E2A27' }}
    >
      <div className="wrap">
        <p className="kicker">Кофейни</p>
        <h2 className="h2" style={{ marginTop: '16px', maxWidth: '14em' }}>
          Пять кофеен в Калининграде и одна на подходе
        </h2>
        <p
          style={{
            marginTop: '20px',
            marginBottom: 0,
            textAlign: 'right',
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#9C948B',
          }}
        >
          *бронь кабинок для созвонов идет на один час
        </p>
        <div className="bento" style={{ marginTop: '16px' }}>
          {locs.map((c) => (
            <article
              key={c.n}
              className={`rise ${c.cls}`}
              style={{
                animationDelay: `${c.delay}ms`,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                background: '#1A1715',
                border: '1px solid #2E2A27',
                borderRadius: '8px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span className="mono" style={{ fontSize: '12px', color: '#C8A97E' }}>
                  {c.n}
                </span>
                <span style={{ fontSize: '12px', color: '#9C948B' }}>{c.district}</span>
              </div>
              <div>
                <h3
                  className="serif"
                  style={{
                    fontWeight: 500,
                    fontSize: '26px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {c.address}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    fontSize: '14px',
                    color: '#9C948B',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 7v5l3 2"></path>
                  </svg>
                  <span className="mono" style={{ fontSize: '13px' }}>
                    {c.hours}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                  gap: '12px',
                  borderTop: '1px solid #2E2A27',
                  paddingTop: '16px',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', letterSpacing: '.01em', color: '#9C948B' }}>
                    Розетки
                  </div>
                  <div className="mono" style={{ fontSize: '24px', lineHeight: 1.3, marginTop: '2px' }}>
                    {c.sockets}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', letterSpacing: '.01em', color: '#9C948B' }}>
                    Рабочих мест
                  </div>
                  <div className="mono" style={{ fontSize: '24px', lineHeight: 1.3, marginTop: '2px' }}>
                    {c.workspaces}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #C8A97E',
                    borderRadius: '18px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    lineHeight: 1.4,
                    color: '#C8A97E',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flex: 'none' }}
                  >
                    <rect x="5" y="3" width="14" height="18" rx="3"></rect>
                    <path d="M9 8h6M9 12h6"></path>
                  </svg>
                  {c.booth}
                </span>
              </div>
            </article>
          ))}

          <a
            href="#zelenogradsk"
            className="rise span6"
            style={{
              animationDelay: '520ms',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px 24px',
              border: '1px dashed #6B6155',
              borderRadius: '8px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #2E2A27',
                  borderRadius: '9999px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  color: '#EDE8E1',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    background: '#7E9C85',
                  }}
                ></span>
                Скоро
              </span>
              <span
                className="serif"
                style={{ fontSize: '26px', fontWeight: 500, letterSpacing: '-0.01em' }}
              >
                Зеленоградск · Курортный пр-т, 14
              </span>
              <span className="mono" style={{ fontSize: '13px', color: '#9C948B' }}>
                весна 2027
              </span>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#C8A97E',
              }}
            >
              Узнать об открытии
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
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
