# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite with HMR)
- **Build:** `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript and React hooks/refresh plugins)
- **Preview production build:** `npm run preview`

## MCP Servers

- **Playwright:** configured in `.mcp.json` using `npx @playwright/mcp@latest --headless --isolated` for browser automation and UI checks.

## Tech Stack

- React 18 + TypeScript (strict mode enabled)
- Vite 5 as bundler with `@vitejs/plugin-react` (Babel-based Fast Refresh)
- ESLint 9 flat config with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins

## Architecture

Single-page React app. Entry point is `src/main.tsx` which renders `<App />` into `#root` (defined in `index.html`). Currently uses the default Vite React template structure with no routing, state management, or additional libraries.

## TypeScript Config

- Target: ES2020, strict mode with `noUnusedLocals` and `noUnusedParameters`
- Bundler module resolution with `allowImportingTsExtensions`
- Separate tsconfigs: `tsconfig.app.json` (src code) and `tsconfig.node.json` (Vite/build tooling)
