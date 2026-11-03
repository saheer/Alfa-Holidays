# Alfa Holidays – Coming Soon

React + Vite + Tailwind CSS + Framer Motion, with an optional Express server.

## Run (development)
Two terminals, so the newsletter form has an API to talk to:

    npm install
    npm run server     # API on http://localhost:3001
    npm run dev        # site on http://localhost:5173 (proxies /api to :3001)

## Production
    npm run build
    npm start          # serves dist/ + /api/subscribe on :3001 (PORT env to change)

Subscribers are saved to server/subscribers.json. To use Mailchimp, Brevo, etc.,
replace the body of the POST /api/subscribe handler in server/index.js.

## Structure
    src/assets/logo.svg
    src/assets/images/bg-desktop.jpg      landscape viewports
    src/assets/images/bg-mobile.jpg       portrait viewports
    src/components/Background.jsx         CSS bg-cover + dark gradient overlay
    src/components/Particles.jsx          canvas motes + sparkles
    src/components/Logo.jsx
    src/components/Hero.jsx               sub-header, heading, dividers, tagline, form
    src/components/Newsletter.jsx         form + success state
    server/index.js
    design-reference/                     original comps (not used at runtime)
