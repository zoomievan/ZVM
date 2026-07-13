# ZoomieVan

React/Vite frontend for ZoomieVan, a mobile canine fitness service.

## Current State

The app uses Clerk for production identity and Convex for users, admin data, fleet records, FSA zones, vaccine records, bookings, CMS settings, and Stripe Checkout state. Production access is authorized inside Convex functions; browser routes are only a navigation convenience. Without the production variables, local development falls back to a browser-storage demo adapter.

Do not treat the fallback demo adapter as production-safe. Production deployments must set the Convex environment variables and deploy the Convex backend before accepting real customer data.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
npm run check
```

`npm run check` is the minimum local launch gate. GitHub Actions also runs typecheck, security regression tests, build, and a high-severity dependency audit on pushes to `main` and pull requests.

## Convex Setup

Client project:

- Dashboard: `https://dashboard.convex.dev/t/zoomievan87/zmv/proper-toad-507`
- Team slug from dashboard URL: `zoomievan87`
- Project slug from dashboard URL: `zmv`

Local `.env.local` should contain the development deployment values:

```bash
VITE_CONVEX_URL=https://proper-toad-507.convex.cloud
CONVEX_DEPLOYMENT=dev:proper-toad-507
```

Production configuration is split between Vercel and Convex:

1. In Vercel, set the production `VITE_CONVEX_URL`, `VITE_CLERK_PUBLISHABLE_KEY`, and `CONVEX_DEPLOY_KEY`.
2. In Clerk, create the standard Convex JWT template named `convex` and use its issuer URL as `CLERK_JWT_ISSUER_DOMAIN` in the production Convex deployment.
3. In that Convex deployment, also set `SITE_URL=https://www.zoomievan.ca` and every `STRIPE_*` variable listed in `.env.example`.
4. Deploy through Vercel. `vercel.json` runs `convex deploy` before the frontend build and supplies the production Convex URL to Vite.
5. In Stripe, send `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed` to `https://<production-deployment>.convex.site/stripe/webhook`.

Never run `seed:demoData` against production. The seed function is internal-only and exists for controlled development setup.

Required environment variables are listed in `.env.example`.

## Production Readiness Notes

Before accepting live payments, complete:

- Have Canadian counsel approve the privacy policy, terms, liability waiver, refund policy, retention/deletion policy, and support details.
- Verify Clerk sign-up, customer isolation, admin access, consent capture, Stripe checkout, webhook processing, and failed-payment behavior on the production domain.
- Configure monitoring alerts, Convex backups, a rollback owner, and an incident-response contact.
- Record the production environment inventory and rotate any secrets that were ever shared outside their dashboards.
