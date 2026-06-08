const express = require('express');
const app = express();
app.use(express.json());

// Simulierte Data-Datenbank
const MARKTDATEN = {
  'hannover': {
    stadt: 'Hannover',
    bundesland: 'Niedersachsen',
    durchschnittsmiete: 9.20,
    kaufpreisProQm: 3100,
    hochwasserrisiko: 'niedrig',
    bodenrichtwert: 320,
    lagequalitaet: 'mittel'
  },
  'berlin': {
    stadt: 'Berlin',
    bundesland: 'Berlin',
    durchschnittsmiete: 14.20,
    kaufpreisProQm: 5200,
    hochwasserrisiko: 'niedrig',
    bodenrichtwert: 890,
    lagequalitaet: 'sehr gut'
  },
  'munich': {
    stadt: 'München',
    bundesland: 'Bayern',
    durchschnittsmiete: 19.80,
    kaufpreisProQm: 8900,
    hochwasserrisiko: 'mittel',
    bodenrichtwert: 1450,
    lagequalitaet: 'sehr gut'
  },
  'hamburg': {
    stadt: 'Hamburg',
    bundesland: 'Hamburg',
    durchschnittsmiete: 13.50,
    kaufpreisProQm: 5800,
    hochwasserrisiko: 'hoch',
    bodenrichtwert: 760,
    lagequalitaet: 'gut'
  }
};

// ===== ENDPOINT 1 : Marktdaten nach Stadt =====
app.get('/api/marktdaten', (req, res) => {
  const stadt = req.query.stadt?.toLowerCase();

  if (!stadt) {
    return res.status(400).json({
      fehler: 'Parameter "stadt" fehlt',
      beispiel: '/api/marktdaten?stadt=Erfurt'
    });
  }

  const daten = MARKTDATEN[stadt];

  if (!daten) {
    return res.status(404).json({
      fehler: `Keine Daten für Stadt: ${stadt}`,
      verfuegbar: Object.keys(MARKTDATEN)
    });
  }

  res.json({
    status: 'ok',
    quelle: 'ImmoPrüf Data API',
    timestamp: new Date().toISOString(),
    daten
  });
});

// ===== ENDPOINT 2 : Wertindikation =====
app.get('/api/wertindikation', (req, res) => {
  const stadt   = req.query.stadt?.toLowerCase();
  const flaeche = parseFloat(req.query.flaeche);
  const typ     = req.query.typ;

  if (!stadt || !flaeche || !typ) {
    return res.status(400).json({
      fehler: 'Parameter fehlen',
      required: ['stadt', 'flaeche', 'typ'],
      beispiel: '/api/wertindikation?stadt=Erfurt&flaeche=85&typ=wohnung'
    });
  }

  const daten = MARKTDATEN[stadt];
  if (!daten) {
    return res.status(404).json({
      fehler: `Keine Daten für Stadt: ${stadt}`
    });
  }

  if (flaeche <= 0 || flaeche > 10000) {
    return res.status(400).json({
      fehler: 'Fläche muss zwischen 1 und 10.000 m² liegen'
    });
  }

  const faktoren = { wohnung: 1.0, haus: 1.15, gewerbe: 0.85 };
  const faktor   = faktoren[typ] || 1.0;
  const marktwert      = daten.kaufpreisProQm * flaeche * faktor;
  const beleihungswert = marktwert * 0.6;

  res.json({
    status: 'ok',
    quelle: 'ImmoPrüf Data API',
    timestamp: new Date().toISOString(),
    eingabe: { stadt: daten.stadt, flaeche, typ },
    ergebnis: {
      marktwert:        Math.round(marktwert),
      beleihungswert:   Math.round(beleihungswert),
      kaufpreisProQm:   daten.kaufpreisProQm,
      waehrung:         'EUR'
    }
  });
});

// ===== ENDPOINT 3 : Hochwasserrisiko =====
app.get('/api/hochwasser', (req, res) => {
  const stadt = req.query.stadt?.toLowerCase();

  if (!stadt) {
    return res.status(400).json({
      fehler: 'Parameter "stadt" fehlt'
    });
  }

  const daten = MARKTDATEN[stadt];
  if (!daten) {
    return res.status(404).json({
      fehler: `Keine Daten für Stadt: ${stadt}`
    });
  }

  res.json({
    status: 'ok',
    stadt: daten.stadt,
    hochwasserrisiko: daten.hochwasserrisiko,
    timestamp: new Date().toISOString()
  });
});

// ===== SERVER STARTEN =====
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ImmoPrüf Data API läuft auf http://localhost:${PORT}`);
  console.log('Verfügbare Endpoints:');
  console.log('  GET /api/marktdaten?stadt=Hannover');
  console.log('  GET /api/wertindikation?stadt=Hannover&flaeche=85&typ=wohnung');
  console.log('  GET /api/hochwasser?stadt=Hannover');
});