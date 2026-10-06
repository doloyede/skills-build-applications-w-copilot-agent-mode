# OctoFit Tracker – Presentation Tier

## API configuration

The frontend calls the Express API through `import.meta.env.VITE_CODESPACE_NAME`.
In a Codespace, `VITE_CODESPACE_NAME` must be defined, for example in `octofit-tracker/frontend/.env.local`:

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

Requests then go to `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/...`.
If the variable is unset, the app falls back to `http://localhost:8000`.
Restart `npm run dev` after changing env files.

Endpoints used: `/api/activities/`, `/api/leaderboard/`, `/api/teams/`, `/api/users/`, `/api/workouts/`.
Both plain array responses and paginated `{ "results": [...] }` responses are supported.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
