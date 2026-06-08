# ImmoPrüf — API Test Report

**Tester:** Steve 
**Datum:** 08.06.2026  
**Tool:** Postman  
**Server:** http://localhost:3000

---

## Endpoint 1 — GET /api/marktdaten

**URL:** `http://localhost:3000/api/marktdaten?stadt=hannover`  
**Status:** ✅ Alle Tests bestanden

| Test | Ergebnis |
|------|----------|
| Status 200 OK | ✅ |
| Antwort enthält status ok | ✅ |
| Antwort enthält Marktdaten | ✅ |
| Antwortzeit unter 500ms | ✅ |
| kaufpreisProQm ist eine Zahl | ✅ |

---

## Endpoint 2 — GET /api/wertindikation

**URL:** `http://localhost:3000/api/wertindikation?stadt=erfurt&flaeche=85&typ=wohnung`  
**Status:** ✅ Alle Tests bestanden

| Test | Ergebnis |
|------|----------|
| Status 200 OK | ✅ |
| Marktwert vorhanden | ✅ |
| Marktwert größer als 0 | ✅ |
| Beleihungswert ist 60% des Marktwerts | ✅ |
| Währung ist EUR | ✅ |

---

## Endpoint 3 — GET /api/hochwasser

**URL:** `http://localhost:3000/api/hochwasser?stadt=hamburg`  
**Status:** ✅ Alle Tests bestanden

| Test | Ergebnis |
|------|----------|
| Status 200 OK | ✅ |
| Hochwasserrisiko vorhanden | ✅ |
| Hochwasserrisiko ist gültiger Wert | ✅ |
| Hamburg hat hohes Hochwasserrisiko | ✅ |
| Antwortzeit unter 500ms | ✅ |

---

## Fehlertests

| Test | URL | Erwartetes Ergebnis | Status |
|------|-----|---------------------|--------|
| Ohne Parameter | /api/marktdaten | 400 + Fehlermeldung | ✅ |
| Unbekannte Stadt | /api/marktdaten?stadt=paris | 404 + Fehlermeldung | ✅ |

---

## Zusammenfassung

| Endpoint | Tests | Bestanden | Status |
|----------|-------|-----------|--------|
| GET /api/marktdaten | 5 | 5 | ✅ |
| GET /api/wertindikation | 5 | 5 | ✅ |
| GET /api/hochwasser | 5 | 5 | ✅ |
| Fehlertests | 5 | 5 | ✅ |
| **Total** | **20** | **20** | ✅ |

**20/20 Tests bestanden ✅**