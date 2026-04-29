# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**CropRotatePro** is a React-based agricultural management application for planning crop rotations, monitoring soil health, and analyzing farm performance.

**Tech Stack:** React 18, Vite, Redux Toolkit, React Router v6, Tailwind CSS, Recharts, D3.js, Framer Motion

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on port 4028 |
| `npm run build` | Production build to `./build` with sourcemaps |
| `npm run serve` | Preview production build |

---

## Architecture

### Routing
- **File:** `src/Routes.jsx`
- **Library:** React Router v6
- **Default route:** `/` renders Crop Rotation Planner

### Pages Structure
Each page lives in `src/pages/{name}/` with an `index.jsx` and optional `components/` subdirectory.

| Page | Description |
|------|-------------|
| `crop-rotation-planner/` | Main planner with timeline, crop database, recommendations |
| `dashboard/` | KPI cards, charts, weather widget |
| `soil-health-monitoring/` | Field map, soil data, trend charts |
| `reports-and-analytics/` | Financial impact, yield performance, export tools |
| `login/` | Login form with background imagery |
| `register/` | Multi-step registration wizard |
| `NotFound.jsx` | 404 fallback |

### Shared Components (`src/components/`)

| File/Dir | Purpose |
|----------|---------|
| `ui/` | Base components: Button (CVA variants), Input, Select, Checkbox, Header, Sidebar, Breadcrumb |
| `AppIcon.jsx` | Wraps Lucide icons |
| `AppImage.jsx` | Image with fallback |
| `ErrorBoundary.jsx` | Error wrapper |
| `ScrollToTop.jsx` | Route scroll reset |

### Utilities
- **`src/utils/cn.js`** — `cn()` merges Tailwind classes using clsx + tailwind-merge

---

## State Management

Local component state via `useState`/`useEffect`. Redux Toolkit is installed but no store/slices exist yet — likely planned for future.

---

## Theming System

Colors are defined via CSS variables in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | deep forest green | Main brand color |
| `secondary` | rich soil brown | Secondary elements |
| `accent` | golden harvest | Highlights, CTAs |
| `success/warning/error/destructive` | semantic colors | Status indicators |

All theme colors use `var(--color-*)` format, enabling runtime theming.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@dhiwise/component-tagger` | **Required Vite plugin** — do not remove from `vite.config.mjs` |
| `lucide-react` | Icon library (via AppIcon component) |
| `recharts` | Charts on dashboard and reports pages |
| `d3` | Low-level data visualization |
| `react-hook-form` | Form handling |
| `react-helmet` | Document head management |
| `class-variance-authority` (CVA) | Component variant styling |
| `framer-motion` | Animations |
| `@radix-ui/react-slot` | Composition (allows components to render as different HTML elements) |

---

## Deployment

- **Vite config:** Allows hosts `.amazonaws.com` and `.builtwithrocket.new`
- **Build output:** `./build`
- **`rocketCritical` block:** `package.json` marks critical dependencies — do not modify this block or the `@dhiwise/component-tagger` plugin

---

## Component Patterns

### Variant Components
Use class-variance-authority (CVA) for components with multiple visual variants. Button demonstrates this with `variant` and `size` axes.

### Radix UI Composition
`@radix-ui/react-slot` enables the `asChild` pattern — components can render as different HTML elements or wrap children.

### Page Imports
Pages resolve via directory name to `index.jsx`:
```jsx
import Dashboard from './pages/dashboard'  // resolves to './pages/dashboard/index.jsx'
```
