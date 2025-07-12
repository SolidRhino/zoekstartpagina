const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
const INSTANCES = process.env.INSTANCE_LIST || './data/instances.json';

app.get('/api/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'No query' });

  const list = JSON.parse(fs.readFileSync(INSTANCES));
  for (const base of list) {
    try {
      const url = `${base}/search?q=${encodeURIComponent(q)}&format=json`;
      const r = await fetch(url, { timeout: 3000 });
      if (!r.ok) throw new Error('Bad response');
      const jr = await r.json();
      return res.json(jr.results.map(r => ({
        title: r.title, url: r.url, snippet: r.content
      })));
    } catch (_) {
      continue;
    }
  }
  res.status(502).json({ error: 'No instance available' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend listening on ${port}`));