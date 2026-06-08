# ImmoPrüf — Bug Report v1.0

**Tester:** Steve  
**Datum:** 08.06.2026  
**Version:** 1.0  
**Umgebung:** Browser / Windows

---

## BUG-001 — Beleihungswert falsch berechnet

**Schweregrad:** Kritisch  
**Status:** Offen

**Beschreibung:**  
Der Beleihungswert wird mit 80% statt 60% des Marktwerts berechnet.

**Schritte zur Reproduktion:**
1. Adresse eingeben: Hauptstrasse 12, Stuttgart
2. Typ: Wohnung
3. Fläche: 85
4. Baujahr: 1990
5. Auf "Wert berechnen" klicken

**Erwartetes Ergebnis:** Beleihungswert = Marktwert × 60%  
**Tatsächliches Ergebnis:** Beleihungswert = Marktwert × 80%

---

## BUG-002 — Bewertungsdatum zeigt 01.01.1970

**Schweregrad:** Mittel  
**Status:** Offen

**Beschreibung:**  
Das Bewertungsdatum zeigt immer 1.1.1970 statt dem heutigen Datum.

**Schritte zur Reproduktion:**
1. Formular ausfüllen und berechnen

**Erwartetes Ergebnis:** Heutiges Datum (08.06.2026)  
**Tatsächliches Ergebnis:** 1.1.1970

---

## BUG-003 — Fläche ohne Einheit angezeigt

**Schweregrad:** Niedrig  
**Status:** Offen

**Beschreibung:**  
Die Wohnfläche wird ohne Einheit "m²" angezeigt.

**Schritte zur Reproduktion:**
1. Fläche: 85 eingeben
2. Berechnen klicken

**Erwartetes Ergebnis:** 85 m²  
**Tatsächliches Ergebnis:** 85

---

## BUG-004 — Gewerbeimmobilie zeigt "undefined"

**Schweregrad:** Kritisch  
**Status:** Offen

**Beschreibung:**  
Wenn Gewerbeimmobilie ausgewählt wird, zeigt das Ergebnis "undefined" 
statt "Gewerbeimmobilie".

**Schritte zur Reproduktion:**
1. Typ: Gewerbeimmobilie auswählen
2. Berechnen klicken

**Erwartetes Ergebnis:** Typ = Gewerbeimmobilie  
**Tatsächliches Ergebnis:** Typ = undefined

---

## BUG-005 — Kein Fehler bei unrealistischem Wert

**Schweregrad:** Mittel  
**Status:** Offen

**Beschreibung:**  
Bei sehr kleiner Fläche und altem Baujahr wird ein Marktwert 
unter 10.000€ berechnet ohne Fehlermeldung. 
Eine Immobilie kann in der Realität nicht unter 10.000€ wert sein.

**Schritte zur Reproduktion:**
1. Fläche: 1
2. Baujahr: 1800
3. Berechnen klicken

**Erwartetes Ergebnis:** Fehlermeldung "Wert unrealistisch"  
**Tatsächliches Ergebnis:** Berechnung läuft ohne Warnung durch

---

## Zusammenfassung

| Bug | Beschreibung | Schweregrad |
|-----|-------------|-------------|
| BUG-001 | Beleihungswert 80% statt 60% | Kritisch |
| BUG-002 | Datum 1.1.1970 | Mittel |
| BUG-003 | Fläche ohne m² | Niedrig |
| BUG-004 | Gewerbe zeigt undefined | Kritisch |
| BUG-005 | Kein Fehler bei unrealist. Wert | Mittel |