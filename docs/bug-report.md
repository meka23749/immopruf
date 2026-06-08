# ImmoPrüf — Bug Report v1.0

**Tester:** steve  
**Datum:** 08.06.2026  
**Version:** 1.0  
**Umgebung:** Browser / Windows

---

## BUG-001 — Beleihungswert falsch berechnet

**Schweregrad:** Kritisch  
**Status:** ✅ Behoben

**Beschreibung:**  
Der Beleihungswert wurde mit 80% statt 60% des Marktwerts berechnet.

**Schritte zur Reproduktion:**
1. Adresse eingeben: Hauptstrasse 12, Erfurt
2. Typ: Wohnung
3. Fläche: 85
4. Baujahr: 1990
5. Auf "Wert berechnen" klicken

**Erwartetes Ergebnis:** Beleihungswert = Marktwert × 60%  
**Tatsächliches Ergebnis:** Beleihungswert = Marktwert × 80%  
**Fix:** `marktwert * 0.8` ersetzt durch `marktwert * 0.6`

---

## BUG-002 — Bewertungsdatum zeigt 01.01.1970

**Schweregrad:** Mittel  
**Status:** ✅ Behoben

**Beschreibung:**  
Das Bewertungsdatum zeigte immer 1.1.1970 statt dem heutigen Datum.

**Schritte zur Reproduktion:**
1. Formular ausfüllen und berechnen

**Erwartetes Ergebnis:** Heutiges Datum (08.06.2026)  
**Tatsächliches Ergebnis:** 1.1.1970  
**Fix:** `new Date(0)` ersetzt durch `new Date()`

---

## BUG-003 — Fläche ohne Einheit angezeigt

**Schweregrad:** Niedrig  
**Status:** ✅ Behoben

**Beschreibung:**  
Die Wohnfläche wurde ohne Einheit "m²" angezeigt.

**Schritte zur Reproduktion:**
1. Fläche: 85 eingeben
2. Berechnen klicken

**Erwartetes Ergebnis:** 85 m²  
**Tatsächliches Ergebnis:** 85  
**Fix:** `flaeche` ersetzt durch `flaeche + ' m²'`

---

## BUG-004 — Gewerbeimmobilie zeigt "undefined"

**Schweregrad:** Kritisch  
**Status:** ✅ Behoben

**Beschreibung:**  
Bei Auswahl von Gewerbeimmobilie zeigte das Ergebnis "undefined".

**Schritte zur Reproduktion:**
1. Typ: Gewerbeimmobilie auswählen
2. Berechnen klicken

**Erwartetes Ergebnis:** Typ = Gewerbeimmobilie  
**Tatsächliches Ergebnis:** Typ = undefined  
**Fix:** `gewerbe: 'Gewerbeimmobilie'` zu typLabels hinzugefügt

---

## BUG-005 — Kein Fehler bei unrealistischem Wert

**Schweregrad:** Mittel  
**Status:** ✅ Behoben

**Beschreibung:**  
Bei sehr kleiner Fläche und altem Baujahr wurde ein Marktwert 
unter 10.000€ berechnet ohne Fehlermeldung.

**Schritte zur Reproduktion:**
1. Fläche: 1
2. Baujahr: 1800
3. Berechnen klicken

**Erwartetes Ergebnis:** Fehlermeldung "Wert unrealistisch"  
**Tatsächliches Ergebnis:** Berechnung lief ohne Warnung durch  
**Fix:** Validierung hinzugefügt — Fehler wenn Marktwert unter 10.000€

---

## Zusammenfassung

| Bug | Beschreibung | Schweregrad | Status |
|-----|-------------|-------------|--------|
| BUG-001 | Beleihungswert 80% statt 60% | Kritisch | ✅ Behoben |
| BUG-002 | Datum 1.1.1970 | Mittel | ✅ Behoben |
| BUG-003 | Fläche ohne m² | Niedrig | ✅ Behoben |
| BUG-004 | Gewerbe zeigt undefined | Kritisch | ✅ Behoben |
| BUG-005 | Kein Fehler bei unrealist. Wert | Mittel | ✅ Behoben |

---

## Testergebnis

**5 Bugs gefunden — 5 Bugs behoben — Alle Tests bestanden ✅**