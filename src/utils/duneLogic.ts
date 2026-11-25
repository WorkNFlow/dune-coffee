export type MenuCategoryKey = 'coffee' | 'notcoffee' | 'food' | 'sets';

export interface StageInfo {
  num: string;
  title: string;
  text: string;
}

export interface StepItem {
  n: string;
  label: string;
  active: boolean;
  border: string;
  color: string;
  bar: number;
  center: number;
}

export interface ScrollyVals {
  stage: StageInfo;
  steps: StepItem[];
  ringLit: number;
  mugO: number;
  mugY: number;
  rimO: number;
  cofO: number;
  cofS: number;
  drpO: number;
  drpY: number;
  strO: number;
  h1: number;
  h2: number;
  h3: number;
  sA: number;
  sB: number;
  sC: number;
}

export interface MenuRawItem {
  name: string;
  note: string;
  price: string;
  price2: string;
  ph?: boolean;
}

export interface MenuRowView {
  name: string;
  note: string;
  price: string;
  price2: string;
  nameColor: string;
  priceColor: string;
  delay: number;
}

export interface MenuTabView {
  key: MenuCategoryKey;
  label: string;
  active: boolean;
  bg: string;
  fg: string;
  bd: string;
}

export interface LocationCardView {
  n: string;
  cls: 'span3' | 'span2';
  delay: number;
  district: string;
  address: string;
  hours: string;
  sockets: number;
  workspaces: number;
  booth: string;
}

export const STAGES: StageInfo[] = [
  {
    num: '01',
    title: 'Чашка',
    text: 'Тяжёлая керамика держит тепло и ложится в руку. Основа спокойной рабочей сессии.',
  },
  {
    num: '02',
    title: 'Экстракция',
    text: 'Фильтр медленно пропускает воду через молотый кофе. Чистый вкус без осадка и спешки.',
  },
  {
    num: '03',
    title: 'Тепло',
    text: 'Горячая чашка, которую можно пить не торопясь. Второй стакан фильтра в тот же день — 140 ₽.',
  },
];

export const STEP_CENTERS: number[] = [0.17, 0.5, 0.84];
export const STEP_LABELS: string[] = ['Чашка', 'Экстракция', 'Тепло'];

export const MENU: Record<MenuCategoryKey, MenuRawItem[]> = {
  coffee: [
    {
      name: 'Фильтр-кофе',
      note: 'Свежая заварка (Эфиопия Гуджи / Колумбия Уила). Второй стакан в тот же день — 140 ₽.',
      price: '260 ₽',
      price2: '140 ₽ рефилл',
    },
    {
      name: 'Эспрессо',
      note: 'Двойной шот из зерна светлой обжарки под эспрессо.',
      price: '190 ₽',
      price2: '',
    },
    {
      name: 'Флэт уайт',
      note: 'Двойной эспрессо и тонкий слой текстурированного молока (200 мл).',
      price: '290 ₽',
      price2: '',
    },
    {
      name: 'Воронка V60',
      note: 'Ручное заваривание микролота недели: чистая кислотность и долгий баланс.',
      price: '340 ₽',
      price2: '',
    },
  ],
  notcoffee: [
    {
      name: 'Матча-латте Удзи',
      note: 'Японский церемониальный зелёный чай на классическом или овсяном молоке.',
      price: '330 ₽',
      price2: '',
    },
    {
      name: 'Гречишный чай Ку Цяо',
      note: 'Без кофеина, с мягким ореховым послевкусием. Чайник 450 мл.',
      price: '280 ₽',
      price2: '',
    },
    {
      name: 'Какао из тёртых бобов',
      note: 'Колумбийский какао 70% на молоке без рафинированного сахара.',
      price: '310 ₽',
      price2: '',
    },
  ],
  food: [
    {
      name: 'Сэндвич с индейкой су-вид',
      note: 'Без резкого запаха — цельнозерновой хлеб, индейка, песто из базилика и творожный сыр.',
      price: '420 ₽',
      price2: '',
    },
    {
      name: 'Бейгл со слабосолёным лососем',
      note: 'Холодная подача с крем-чизом, свежим огурцом и микрозеленью — не крошится за столом.',
      price: '460 ₽',
      price2: '',
    },
    {
      name: 'Чиа-пудинг с манго и кокосом',
      note: 'Лёгкий перекус в стакане — руки и клавиатура остаются чистыми.',
      price: '320 ₽',
      price2: '',
    },
  ],
  sets: [
    {
      name: 'Рабочий сет «Утро»',
      note: 'Фильтр-кофе + сэндвич с индейкой или бейгл с лососем + один рефилл фильтра в течение дня.',
      price: '590 ₽',
      price2: 'выгода 230 ₽',
    },
    {
      name: 'Сет «Глубокий фокус»',
      note: 'Большой фильтр-кофе 350 мл + чайник гречишного чая Ку Цяо + ореховый батончик без сахара.',
      price: '490 ₽',
      price2: 'на 3–4 часа работы',
    },
  ],
};

export const TAB_DEFS: Array<[MenuCategoryKey, string]> = [
  ['coffee', 'Кофе'],
  ['notcoffee', 'Не кофе'],
  ['food', 'Еда без запахов'],
  ['sets', 'Рабочие сеты'],
];

const RAW_LOCATIONS = [
  {
    district: 'Калининград · Хуфен',
    address: 'пр-т Мира, 41',
    hours: '07:30 — 22:00',
    sockets: 48,
    workspaces: 32,
    booth: 'Кабинка для созвонов: 2 места (бронь на 1 час)',
  },
  {
    district: 'Калининград · Амалиенау',
    address: 'ул. Кутузова, 18',
    hours: '08:00 — 21:00',
    sockets: 36,
    workspaces: 24,
    booth: 'Кабинка для созвонов: 2 места (бронь на 1 час)',
  },
  {
    district: 'Калининград · Центр',
    address: 'ул. Профессора Баранова, 34',
    hours: '07:30 — 22:00',
    sockets: 42,
    workspaces: 28,
    booth: 'Кабинка для созвонов: 2 места (бронь на 1 час)',
  },
  {
    district: 'Калининград · Остров',
    address: 'ул. Октябрьская, 8',
    hours: '08:00 — 22:00',
    sockets: 30,
    workspaces: 20,
    booth: 'Кабинка для созвонов: 1 место (бронь на 1 час)',
  },
  {
    district: 'Калининград · Верхнее озеро',
    address: 'ул. Тельмана, 16',
    hours: '08:00 — 21:00',
    sockets: 34,
    workspaces: 22,
    booth: 'Кабинка для созвонов: 2 места (бронь на 1 час)',
  },
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

export function round3(x: number): number {
  return Math.round(x * 1000) / 1000;
}

export function computeScrollProgress(rectTop: number, rectHeight: number, viewportHeight: number): number {
  let p = 1;
  if (viewportHeight < rectHeight - 1) {
    const range = rectHeight - 800;
    p = range > 0 ? Math.min(1, Math.max(0, (72 - rectTop) / range)) : 1;
  }
  return p;
}

export function computeScrollyVals(scrollP: number, manualP: number | null): ScrollyVals {
  const p = manualP !== null && manualP !== undefined ? manualP : scrollP;
  const p1 = clamp01(p / 0.34);
  const p2 = clamp01((p - 0.34) / 0.33);
  const p3 = clamp01((p - 0.67) / 0.33);
  const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  const bars = [p1, p2, p3];

  const steps: StepItem[] = STEP_LABELS.map((label, i) => ({
    n: '0' + (i + 1),
    label,
    active: idx === i,
    border: idx === i ? '#C8A97E' : '#6B6155',
    color: idx === i ? '#EDE8E1' : '#9C948B',
    bar: round3(bars[i] * 100),
    center: STEP_CENTERS[i],
  }));

  return {
    stage: STAGES[idx],
    steps,
    ringLit: round3(p * 60),
    mugO: round3(p1),
    mugY: round3((1 - p1) * 36),
    rimO: round3(0.8 * p3),
    cofO: round3(p2),
    cofS: round3(0.2 + 0.8 * p2),
    drpO: round3(p2 * (1 - clamp01(p3 * 3))),
    drpY: round3(-(1 - p2) * 24),
    strO: round3(1 - clamp01(p2 * 1.6)),
    h1: round3(0.38 * clamp01(p3 * 3)),
    h2: round3(0.26 * clamp01(p3 * 3 - 1)),
    h3: round3(0.16 * clamp01(p3 * 3 - 2)),
    sA: round3(1 - clamp01(p3 / 0.8)),
    sB: round3(1 - clamp01((p3 - 0.1) / 0.8)),
    sC: round3(1 - clamp01((p3 - 0.2) / 0.8)),
  };
}

export function getTabsState(activeTab: MenuCategoryKey): MenuTabView[] {
  return TAB_DEFS.map(([key, label]) => {
    const on = activeTab === key;
    return {
      key,
      label,
      active: on,
      bg: on ? '#C8A97E' : 'transparent',
      fg: on ? '#121214' : '#EDE8E1',
      bd: on ? '#C8A97E' : '#6B6155',
    };
  });
}

export function getMenuRows(activeTab: MenuCategoryKey): MenuRowView[] {
  const list = MENU[activeTab] || MENU.coffee;
  return list.map((r, i) => ({
    name: r.name,
    note: r.note,
    price: r.price,
    price2: r.price2,
    nameColor: r.ph ? '#9C948B' : '#EDE8E1',
    priceColor: r.ph ? '#9C948B' : '#EDE8E1',
    delay: i * 70,
  }));
}

export function getLocationsList(): LocationCardView[] {
  return RAW_LOCATIONS.map((loc, idx) => {
    const n = idx + 1;
    return {
      n: '0' + n,
      cls: n <= 2 ? 'span3' : 'span2',
      delay: n * 70,
      ...loc,
    };
  });
}

export function validateSubscription(email: string, consent: boolean): { valid: boolean; error: string } {
  if (!EMAIL_RE.test((email || '').trim())) {
    return { valid: false, error: 'Укажите корректный адрес почты.' };
  }
  if (!consent) {
    return { valid: false, error: 'Нужно согласие с политикой конфиденциальности.' };
  }
  return { valid: true, error: '' };
}
