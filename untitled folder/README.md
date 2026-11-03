# Alfa Holidays – Coming Soon

React + Vite + Tailwind CSS + Framer Motion, with an optional Express server.

## Run
    npm install
    npm run dev            # http://localhost:5173

## Production
    npm run build
    npm start              # serves dist/ on http://localhost:3001 (PORT env to change)

## Structure
    src/assets/logo.svg                 official logo
    src/assets/images/bg-desktop.jpg    landscape background
    src/assets/images/bg-mobile.jpg     portrait background
    src/components/Background.jsx       art-directed <picture> + slow settle zoom
    src/components/Logo.jsx
    src/components/Hero.jsx             sub-header, heading, divider lines, tagline
    server/index.js                     static hosting + optional /api/subscribe
    design-reference/                   original design comps (not used at runtime)
