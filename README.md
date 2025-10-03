# AuroraPass — Password Generator (React + Vite)

**Live Demo**: [aurora-pass.vercel.app](https://aurora-pass.vercel.app/)

AuroraPass is a minimal, fast password generator built with React and Vite. It lets you quickly generate strong passwords, adjust length, include numbers and symbols, and copy with one click. A visual strength indicator helps you gauge the current configuration.

## Features

- Generate random passwords instantly
- Adjustable length (6–100)
- Toggle inclusion of numbers and symbols
- One‑click copy to clipboard with toast
- Visual strength indicator based on current options

## Tech Stack

- React 19
- Vite 7 (development server and build)
- ESLint (recommended rules)
- Styling via plain CSS in `src/App.css`

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Vite will start a local dev server and print the URL in the terminal (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

The production build will be output to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

## Project Structure

```
├─ public/
├─ src/
│  ├─ assets/
│  ├─ App.css        # Component styles
│  ├─ App.jsx        # Main UI and password generator logic
│  ├─ index.css      # Global styles (fonts, base)
│  └─ main.jsx       # App entry
├─ index.html         # HTML template
├─ vite.config.js     # Vite config
├─ package.json       # Scripts and dependencies
└─ README.md
```

## How It Works (Quick Overview)

- Passwords are generated from a character pool that always includes A–Z and a–z.
- Optionally includes digits (0–9) and symbols when toggled.
- The strength indicator is a simple UI heuristic based on length and selected options.

## Customization Ideas

- Add more symbol sets or exclude ambiguous characters
- Persist settings to `localStorage`
- Add a dark/light theme toggle
- Export generated passwords to a file

## License

MIT
