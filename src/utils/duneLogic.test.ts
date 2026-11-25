import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeScrollProgress,
  computeScrollyVals,
  getTabsState,
  getMenuRows,
  getLocationsList,
  validateSubscription,
} from './duneLogic.ts';

describe('computeScrollProgress', () => {
  test('returns 0 when rectTop is at or below sticky offset 72', () => {
    assert.equal(computeScrollProgress(200, 1900, 900), 0);
    assert.equal(computeScrollProgress(72, 1900, 900), 0);
  });

  test('returns 0.5 at midpoint of scroll range (rectHeight 1900 -> range 1100)', () => {
    assert.equal(computeScrollProgress(-478, 1900, 900), 0.5);
  });

  test('clamps to 1 when scrolled past range or when viewport is taller than container', () => {
    assert.equal(computeScrollProgress(-1500, 1900, 900), 1);
    assert.equal(computeScrollProgress(100, 1900, 2000), 1);
  });
});

describe('computeScrollyVals', () => {
  test('selects stage 01 at p=0.17 (manual override takes precedence over scrollP)', () => {
    const vals = computeScrollyVals(1, 0.17);
    assert.equal(vals.stage.num, '01');
    assert.equal(vals.stage.title, 'Чашка');
    assert.equal(vals.steps[0].active, true);
    assert.equal(vals.steps[1].active, false);
    assert.equal(vals.steps[2].active, false);
    assert.equal(vals.mugO, 0.5);
    assert.equal(vals.cofO, 0);
  });

  test('selects stage 02 at p=0.5', () => {
    const vals = computeScrollyVals(0.5, null);
    assert.equal(vals.stage.num, '02');
    assert.equal(vals.stage.title, 'Экстракция');
    assert.equal(vals.steps[1].active, true);
    assert.equal(vals.mugO, 1);
    assert.equal(vals.mugY, 0);
    assert.ok(vals.cofO > 0.48 && vals.cofO < 0.49);
  });

  test('selects stage 03 at p=1 with full steam and heat rings', () => {
    const vals = computeScrollyVals(1, null);
    assert.equal(vals.stage.num, '03');
    assert.equal(vals.stage.title, 'Тепло');
    assert.equal(vals.steps[2].active, true);
    assert.equal(vals.ringLit, 60);
    assert.equal(vals.rimO, 0.8);
    assert.equal(vals.h1, 0.38);
    assert.equal(vals.h2, 0.26);
    assert.equal(vals.h3, 0.16);
    assert.equal(vals.sA, 0);
    assert.equal(vals.sB, 0);
    assert.equal(vals.sC, 0);
  });
});

describe('Menu and Locations helpers', () => {
  test('getTabsState marks only selected tab active with gold background', () => {
    const tabs = getTabsState('food');
    assert.equal(tabs.length, 4);
    const active = tabs.find((t) => t.key === 'food');
    const inactive = tabs.find((t) => t.key === 'coffee');
    assert.equal(active?.active, true);
    assert.equal(active?.bg, '#C8A97E');
    assert.equal(inactive?.active, false);
    assert.equal(inactive?.bg, 'transparent');
  });

  test('getMenuRows returns populated realistic rows without bracket placeholders', () => {
    const coffeeRows = getMenuRows('coffee');
    assert.equal(coffeeRows.length, 4);
    assert.equal(coffeeRows[0].name, 'Фильтр-кофе');
    assert.equal(coffeeRows[2].name, 'Флэт уайт');
    assert.equal(coffeeRows[2].price, '290 ₽');
    assert.equal(coffeeRows[2].nameColor, '#EDE8E1');
    assert.equal(coffeeRows[2].delay, 140);
  });

  test('getLocationsList returns 5 Kaliningrad cards with realistic streets and capacities', () => {
    const locs = getLocationsList();
    assert.equal(locs.length, 5);
    assert.equal(locs[0].cls, 'span3');
    assert.equal(locs[0].address, 'пр-т Мира, 41');
    assert.equal(locs[0].sockets, 48);
    assert.equal(locs[1].cls, 'span3');
    assert.equal(locs[2].cls, 'span2');
    assert.equal(locs[4].n, '05');
  });
});

describe('validateSubscription', () => {
  test('rejects empty or malformed email', () => {
    assert.deepEqual(validateSubscription('', true), {
      valid: false,
      error: 'Укажите корректный адрес почты.',
    });
    assert.deepEqual(validateSubscription('invalid-email', true), {
      valid: false,
      error: 'Укажите корректный адрес почты.',
    });
  });

  test('rejects valid email when consent is false', () => {
    assert.deepEqual(validateSubscription('dev@dune.ru', false), {
      valid: false,
      error: 'Нужно согласие с политикой конфиденциальности.',
    });
  });

  test('accepts valid email with consent checked', () => {
    assert.deepEqual(validateSubscription('  dev@dune.ru ', true), {
      valid: true,
      error: '',
    });
  });
});
