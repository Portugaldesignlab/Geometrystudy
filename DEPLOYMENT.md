# Deploying to Vercel

This project is a static front-end site (`index.html`, `styles.css`, `script.js`) and is ready to deploy on Vercel.

## Prerequisites
- A Vercel account
- Vercel CLI installed locally (`npm i -g vercel`)

## Deploy steps
1. From the project root, run:
   ```bash
   vercel
   ```
   Follow the interactive setup (team, project name, scope).

2. For production deployment, run:
   ```bash
   vercel --prod
   ```

3. Vercel will output a deployment URL when complete.

## Notes
- `vercel.json` is included to route all paths to `index.html` so the UX experience always loads from a single entry point.
