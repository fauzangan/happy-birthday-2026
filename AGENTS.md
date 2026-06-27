# Repository Guidelines

## Project Structure & Module Organization

This is a Vite 5 single-page React 18 application written in TypeScript. The app entry point is `src/main.tsx`, which renders `src/App.tsx` into `index.html`. Reusable UI lives in `src/components/`, including `Hero.tsx`, `Gallery.tsx`, `Timeline.tsx`, and related anniversary-page sections. Global and app-level styles are in `src/index.css` and `src/App.css`; component styles currently share those files rather than separate CSS modules. Static files served directly by Vite belong in `public/`. Build output is generated in `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

- `npm run dev`: start the Vite development server with hot module replacement.
- `npm run build`: run TypeScript project checks with `tsc -b`, then create a production build in `dist/`.
- `npm run lint`: run ESLint across the repository using the flat config in `eslint.config.js`.
- `npm run preview`: serve the built production output locally for review.

Install dependencies with `npm install` when starting from a fresh checkout.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component filenames in PascalCase, for example `LoveCounter.tsx`, and use clear descriptive names for constants and props. Follow the existing style: 2-space indentation, single quotes, semicolons in source files, and JSX with the React automatic runtime. CSS class names use a BEM-like pattern such as `hero__content` and `footer__text`; keep new classes consistent with that convention.

## Testing Guidelines

No automated test framework is configured yet. For now, validate changes with `npm run lint` and `npm run build`. For UI changes, run `npm run dev` or `npm run preview` and check the relevant sections in the browser. If tests are added later, prefer colocated tests near components, such as `src/components/Hero.test.tsx`, and document the new command in `package.json`.

## Commit & Pull Request Guidelines

This working tree does not include Git history, so no project-specific commit convention can be inferred. Use short, imperative commit subjects such as `Add gallery animation` or `Fix anniversary counter layout`. Pull requests should include a concise summary, screenshots or screen recordings for visual changes, any linked issue, and the commands run for verification.

## Agent-Specific Instructions

Do not edit generated files in `dist/` or dependency files in `node_modules/`. Keep changes focused on `src/`, configuration files, or documentation unless the task explicitly requires otherwise.
