# ZoomieVan

React/Vite frontend for ZoomieVan, a mobile canine fitness service.

## Current State

The app currently runs with a local demo data adapter backed by browser storage. Convex has been added as the intended production backend, but the production Convex deployment is not connected yet because the client-owned Convex account is not available.

Do not treat the current demo adapter as production-safe. User accounts, admin data, bookings, fleet records, vaccine records, and CMS settings must move to Convex before a real launch.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run check
```

`npm run check` is the minimum local launch gate. GitHub Actions also runs typecheck, build, and a high-severity dependency audit on pushes to `main` and pull requests.

## Convex Setup Later

Client project:

- Dashboard: `https://dashboard.convex.dev/t/zoomievan87/zmv/proper-toad-507`
- Team slug from dashboard URL: `zoomievan87`
- Project slug from dashboard URL: `zmv`

When the Convex CLI is logged into an account with access to that team:

1. Add the production values to Vercel and local `.env.local`.
2. Set `VITE_CONVEX_URL`.
3. Run `npm run convex:dev` locally to generate Convex types during development.
4. Run `npm run convex:deploy` from CI or a controlled release machine.
5. Replace the local repository adapter with Convex queries and mutations.

The local Convex CLI must be logged into a Convex account that can access the `zoomievan87` team, or a production deploy key must be configured in Vercel as `CONVEX_DEPLOY_KEY`.

Required environment variables are listed in `.env.example`.

## Production Readiness Notes

Before production launch, complete:

- Server-side auth and admin authorization.
- Convex persistence for users, dogs, bookings, CMS, fleet, FSAs, vaccines, and reports.
- Privacy policy, terms, liability waiver, retention/deletion policy, and support contact pages.
- CI checks for typecheck, build, dependency audit, and tests.
- Monitoring, rollback, and incident response.
