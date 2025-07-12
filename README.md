# Zoekstartpagina

Een privacyvriendelijke, Europese zoekmachine-voorkant gebouwd met Svelte, Node.js en Python. Automatische selectie van publieke SearXNG-instanties, shortcut-ondersteuning (!yt, !gh) en AI-routing mogelijk.

## Projectstructuur

- `frontend/` - SvelteKit UI
- `backend/` - Express API die queries afhandelt
- `updater/` - Python script dat iedere 6 uur Europese instanties ophaalt
- `data/` - Bevat `instances.json` met de geldige instanties
- `docker-compose.yml` - Combineert alles in één eenvoudig commando

## Gebruik

```bash
docker-compose up --build
```

Frontend: http://localhost:3000  
Backend: http://localhost:4000/api/search?q=test