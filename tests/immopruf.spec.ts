import { test, expect } from '@playwright/test';

const APP_URL = process.env.APP_URL || 'http://localhost:8080/index.html';

async function fillForm(page, data: {
  adresse?: string,
  typ?: string,
  flaeche?: string,
  baujahr?: string
}) {
  await page.goto(APP_URL);
  if (data.adresse) await page.fill('#adresse', data.adresse);
  if (data.typ)     await page.selectOption('#typ', data.typ);
  if (data.flaeche) await page.fill('#flaeche', data.flaeche);
  if (data.baujahr) await page.fill('#baujahr', data.baujahr);
  await page.click('button');
}

// ===== VALIDIERUNG =====

test('Fehler wenn Adresse fehlt', async ({ page }) => {
  await fillForm(page, { typ: 'wohnung', flaeche: '85', baujahr: '1990' });
  await expect(page.locator('#fehler')).toBeVisible();
  await expect(page.locator('#fehler')).toContainText('Adresse');
});

test('Fehler wenn Typ fehlt', async ({ page }) => {
  await fillForm(page, { adresse: 'Hauptstrasse 12', flaeche: '85', baujahr: '1990' });
  await expect(page.locator('#fehler')).toBeVisible();
});

test('Fehler wenn Fläche fehlt', async ({ page }) => {
  await fillForm(page, { adresse: 'Hauptstrasse 12', typ: 'wohnung', baujahr: '1990' });
  await expect(page.locator('#fehler')).toBeVisible();
});

test('Fehler wenn Baujahr fehlt', async ({ page }) => {
  await fillForm(page, { adresse: 'Hauptstrasse 12', typ: 'wohnung', flaeche: '85' });
  await expect(page.locator('#fehler')).toBeVisible();
});

// ===== BUG-001 : Beleihungswert 60% =====

test('BUG-001 Beleihungswert ist 60% des Marktwerts', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'wohnung',
    flaeche: '100',
    baujahr: '2020'
  });
  await expect(page.locator('#ergebnis')).toBeVisible();

  const marktwertText    = await page.locator('#res-wert').textContent();
  const beleihungText    = await page.locator('#res-beleihung').textContent();

  const marktwert   = parseFloat(marktwertText.replace(/[^0-9,]/g, '').replace(',', '.'));
  const beleihung   = parseFloat(beleihungText.replace(/[^0-9,]/g, '').replace(',', '.'));
  const ratio       = beleihung / marktwert;

  expect(ratio).toBeCloseTo(0.6, 1);
});

// ===== BUG-002 : Datum ist heute =====

test('BUG-002 Bewertungsdatum ist das heutige Datum', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'wohnung',
    flaeche: '85',
    baujahr: '1990'
  });
  await expect(page.locator('#ergebnis')).toBeVisible();

  const heute = new Date().toLocaleDateString('de-DE');
  await expect(page.locator('#res-datum')).toContainText(heute);
});

// ===== BUG-003 : Fläche mit m² =====

test('BUG-003 Fläche wird mit m² angezeigt', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'wohnung',
    flaeche: '85',
    baujahr: '1990'
  });
  await expect(page.locator('#ergebnis')).toBeVisible();
  await expect(page.locator('#res-flaeche')).toContainText('m²');
});

// ===== BUG-004 : Gewerbeimmobilie =====

test('BUG-004 Gewerbeimmobilie wird korrekt angezeigt', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'gewerbe',
    flaeche: '200',
    baujahr: '2000'
  });
  await expect(page.locator('#ergebnis')).toBeVisible();
  await expect(page.locator('#res-typ')).toContainText('Gewerbeimmobilie');
});

// ===== BUG-005 : Unrealistischer Wert =====

test('BUG-005 Fehler bei unrealistischem Wert unter 10000 EUR', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'wohnung',
    flaeche: '1',
    baujahr: '1800'
  });
  await expect(page.locator('#fehler')).toBeVisible();
  await expect(page.locator('#ergebnis')).not.toBeVisible();
});

// ===== HAPPY PATH =====

test('Komplette Berechnung funktioniert korrekt', async ({ page }) => {
  await fillForm(page, {
    adresse: 'Hauptstrasse 12, Erfurt',
    typ: 'haus',
    flaeche: '120',
    baujahr: '2005'
  });
  await expect(page.locator('#ergebnis')).toBeVisible();
  await expect(page.locator('#res-adresse')).toContainText('Hauptstrasse 12');
  await expect(page.locator('#res-wert')).toBeVisible();
  await expect(page.locator('#res-beleihung')).toBeVisible();
});