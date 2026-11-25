import { FormEvent, useState } from 'react';
import { validateSubscription } from '../utils/duneLogic';

export function ZelenogradskSection() {
  const [email, setEmail] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = validateSubscription(email, consent);
    if (!res.valid) {
      setErr(res.error);
      return;
    }
    setSent(true);
    setErr('');
  };

  const handleReset = () => {
    setSent(false);
    setConsent(false);
  };

  return (
    <section
      id="zelenogradsk"
      className="sec"
      style={{ padding: '96px 0', borderTop: '1px solid #2E2A27' }}
    >
      <div className="wrap">
        <div
          className="zbanner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#1A1715',
            border: '1px solid #2E2A27',
            borderRadius: '8px',
            padding: '64px',
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            fill="none"
            stroke="#C8A97E"
            strokeWidth="1"
          >
            <path d="M0 70 C 300 66, 600 74, 900 68 S 1200 72, 1200 70" strokeOpacity=".07"></path>
            <path d="M0 86 C 300 82, 600 90, 900 84 S 1200 88, 1200 86" strokeOpacity=".08"></path>
            <path d="M0 104 C 300 100, 600 108, 900 102 S 1200 106, 1200 104" strokeOpacity=".09"></path>
            <path d="M0 124 C 300 120, 600 128, 900 122 S 1200 126, 1200 124" strokeOpacity=".10"></path>
            <path
              d="M-20 330 C 220 290, 480 372, 700 326 S 1040 290, 1220 336"
              strokeOpacity=".12"
            ></path>
            <path
              d="M-20 366 C 260 316, 460 404, 720 360 S 1060 326, 1220 372"
              strokeOpacity=".15"
            ></path>
            <path
              d="M-20 402 C 200 358, 500 436, 740 394 S 1080 362, 1220 408"
              strokeOpacity=".18"
            ></path>
            <path
              d="M-20 438 C 240 396, 480 470, 700 430 S 1040 398, 1220 444"
              strokeOpacity=".21"
            ></path>
            <path
              d="M-20 474 C 220 436, 520 500, 760 466 S 1100 436, 1220 480"
              strokeOpacity=".24"
            ></path>
          </svg>

          <div className="zg" style={{ position: 'relative' }}>
            <div>
              <p className="kicker">Зеленоградск 2027</p>
              <h2
                className="serif"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem,5vw,3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '16px 0 0',
                }}
              >
                Дюна у моря. Открытие в Зеленоградске весной 2027
              </h2>
              <p className="lead" style={{ marginTop: '20px', maxWidth: '440px' }}>
                Оставьте почту — напишем один раз, когда откроем двери. Подписка действует после подтверждения по ссылке из письма.
              </p>
            </div>

            <div
              style={{
                background: '#121214',
                border: '1px solid #2E2A27',
                borderRadius: '8px',
                padding: '28px',
              }}
            >
              {sent ? (
                <div role="status">
                  <p
                    className="serif"
                    style={{
                      fontSize: '30px',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    Проверьте почту
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#9C948B',
                      margin: '12px 0 0',
                    }}
                  >
                    Мы отправили письмо на <span style={{ color: '#EDE8E1' }}>{email}</span>. Перейдите по ссылке внутри, чтобы подтвердить подписку.
                  </p>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={handleReset}
                    style={{
                      marginTop: '20px',
                      minHeight: '44px',
                      padding: '0 20px',
                      borderRadius: '9999px',
                      background: 'transparent',
                      border: '1px solid #EDE8E1',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Изменить адрес
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="sub-email" style={{ fontSize: '13px', color: '#9C948B' }}>
                      Электронная почта
                    </label>
                    <input
                      id="sub-email"
                      className="field"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.ru"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErr('');
                      }}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 20px',
                        borderRadius: '9999px',
                        border: '1px solid #6B6155',
                        background: 'transparent',
                        color: '#EDE8E1',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      minHeight: '44px',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: '#9C948B',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErr('');
                      }}
                      style={{
                        flex: 'none',
                        width: '18px',
                        height: '18px',
                        margin: '3px 0 0',
                        accentColor: '#C8A97E',
                      }}
                    />
                    <span>
                      Согласен(на) на обработку адреса почты для письма об открытии и с{' '}
                      <a
                        href="#privacy"
                        style={{
                          color: '#C8A97E',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>
                  {err ? (
                    <p
                      role="alert"
                      style={{ fontSize: '14px', lineHeight: 1.5, color: '#EDE8E1', margin: 0 }}
                    >
                      {err}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      minHeight: '48px',
                      padding: '0 24px',
                      border: 'none',
                      background: '#C8A97E',
                      color: '#121214',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '9999px',
                    }}
                  >
                    Сообщить об открытии
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#121214"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M9 7h8v8"></path>
                    </svg>
                  </button>
                </form>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #2E2A27',
                  fontSize: '14px',
                  color: '#EDE8E1',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: 'none',
                    width: '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    background: '#7E9C85',
                  }}
                ></span>
                <span>
                  <span className="mono">{sent ? 419 : 418}</span> подтверждённых подписчиков уже с нами
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
