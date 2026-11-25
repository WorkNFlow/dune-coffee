import { useState } from 'react';
import { getMenuRows, getTabsState, MenuCategoryKey } from '../utils/duneLogic';

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategoryKey>('coffee');
  const tabs = getTabsState(activeTab);
  const rows = getMenuRows(activeTab);

  return (
    <section id="menu" className="sec" style={{ padding: '96px 0' }}>
      <div className="wrap">
        <p className="kicker">Меню</p>
        <h2 className="h2" style={{ marginTop: '16px', maxWidth: '14em' }}>
          Честно и читаемо: цена рядом с названием
        </h2>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '40px' }}
          role="group"
          aria-label="Разделы меню"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className="btn"
              onClick={() => setActiveTab(t.key)}
              aria-pressed={t.active}
              style={{
                minHeight: '44px',
                padding: '0 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                background: t.bg,
                color: t.fg,
                border: `1px solid ${t.bd}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="menu-grid" style={{ marginTop: '32px' }}>
          <div
            style={{
              background: '#1A1715',
              border: '1px solid #2E2A27',
              borderRadius: '8px',
              padding: '8px 28px',
            }}
          >
            {rows.map((r, idx) => (
              <div
                key={`${activeTab}-${idx}`}
                className="rise"
                style={{
                  animationDelay: `${r.delay}ms`,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: '16px',
                  alignItems: 'baseline',
                  padding: '22px 0',
                  borderBottom: '1px solid #2E2A27',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: r.nameColor,
                    }}
                  >
                    {r.name}
                  </div>
                  {r.note ? (
                    <div
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.5,
                        color: '#9C948B',
                        marginTop: '4px',
                        maxWidth: '46ch',
                      }}
                    >
                      {r.note}
                    </div>
                  ) : null}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: '15px', color: r.priceColor }}>
                    {r.price}
                  </div>
                  {r.price2 ? (
                    <div
                      className="mono"
                      style={{ fontSize: '13px', color: '#9C948B', marginTop: '4px' }}
                    >
                      {r.price2}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <aside
            style={{
              border: '1px solid #C8A97E',
              borderRadius: '8px',
              padding: '28px',
            }}
          >
            <p className="kicker">Рефилл</p>
            <p
              className="serif"
              style={{
                fontSize: '30px',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                margin: '12px 0 0',
                color: '#EDE8E1',
              }}
            >
              Второй стакан фильтра в тот же день — 140 ₽
            </p>
            <div style={{ marginTop: '24px', borderTop: '1px solid #2E2A27' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '14px 0',
                  borderBottom: '1px solid #2E2A27',
                  fontSize: '14px',
                }}
              >
                <span style={{ color: '#9C948B' }}>Первый стакан</span>
                <span className="mono">260 ₽</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '14px 0',
                  borderBottom: '1px solid #2E2A27',
                  fontSize: '14px',
                }}
              >
                <span style={{ color: '#9C948B' }}>Второй, в тот же день</span>
                <span className="mono" style={{ color: '#C8A97E' }}>
                  140 ₽
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
