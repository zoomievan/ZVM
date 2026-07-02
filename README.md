# ZoomieVan

React/Vite frontend for ZoomieVan, a mobile canine fitness service.

## Current State

The app has a Convex-backed repository adapter for users, admin data, fleet records, FSA zones, vaccine records, bookings, and CMS settings. When `VITE_CONVEX_URL` is present, the app calls Convex. Without that variable, it falls back to the local demo browser-storage adapter for development.

Do not treat the fallback demo adapter as production-safe. Production deployments must set the Convex environment variables and deploy the Convex backend before accepting real customer data.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run check
```

`npm run check` is the minimum local launch gate. GitHub Actions also runs typecheck, build, and a high-severity dependency audit on pushes to `main` and pull requests.

## Convex Setup

Client project:

- Dashboard: `https://dashboard.convex.dev/t/zoomievan87/zmv/proper-toad-507`
- Team slug from dashboard URL: `zoomievan87`
- Project slug from dashboard URL: `zmv`

Local `.env.local` should contain:

```bash
VITE_CONVEX_URL=https://proper-toad-507.convex.cloud
CONVEX_DEPLOYMENT=dev:proper-toad-507
```

When the Convex CLI is logged into an account with access to that team, or when `CONVEX_DEPLOY_KEY` is configured in CI/Vercel:

1. Add `VITE_CONVEX_URL`, `CONVEX_DEPLOYMENT`, and `CONVEX_DEPLOY_KEY` to Vercel.
2. Run `npm run convex:deploy` from CI or a controlled release machine.
3. Optionally run the demo seed mutation after the first deploy: `seed:demoData`.

The local Convex CLI must be logged into a Convex account that can access the `zoomievan87` team, or a production deploy key must be configured in Vercel as `CONVEX_DEPLOY_KEY`.

Required environment variables are listed in `.env.example`.

## Production Readiness Notes

Before production launch, complete:

- Server-side auth and admin authorization.
- Convex deployment from an account or deploy key with access to `zoomievan87/zmv`.
- Privacy policy, terms, liability waiver, retention/deletion policy, and support contact pages.
- CI checks for typecheck, build, dependency audit, and tests.
- Monitoring, rollback, and incident response.
