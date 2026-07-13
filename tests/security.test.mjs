import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

function exportedBlock(source, name) {
  const start = source.indexOf(`export const ${name} =`);
  assert.notEqual(start, -1, `Missing exported Convex function: ${name}`);
  const next = source.indexOf("\nexport const ", start + 1);
  return source.slice(start, next === -1 ? undefined : next);
}

test("Clerk identity is propagated to Convex", async () => {
  const [config, main] = await Promise.all([
    read("convex/auth.config.ts"),
    read("src/main.tsx"),
  ]);

  assert.match(config, /CLERK_JWT_ISSUER_DOMAIN/);
  assert.match(config, /applicationID:\s*["']convex["']/);
  assert.match(main, /ConvexProviderWithClerk/);
  assert.match(main, /useAuth/);
});

test("every administrative Convex operation requires an admin", async () => {
  const contracts = {
    bookings: ["list"],
    cms: ["update"],
    fleet: ["list", "add", "update", "incrementSession", "remove"],
    fsaZones: ["add", "update", "remove"],
    vaccines: ["list", "add", "approve", "reject", "remove"],
  };

  for (const [module, names] of Object.entries(contracts)) {
    const source = await read(`convex/${module}.ts`);
    for (const name of names) {
      assert.match(exportedBlock(source, name), /requireAdmin\(ctx\)/);
    }
  }
});

test("the public user API cannot return credentials or assign roles", async () => {
  const source = await read("convex/users.ts");
  const publicShape = source.slice(
    source.indexOf("function userFromDoc"),
    source.indexOf("function cleanAddress"),
  );

  assert.doesNotMatch(publicShape, /authProviderUserId|passwordHash|passwordSalt/);
  assert.doesNotMatch(source, /role:\s*v\.optional/);
  assert.match(source, /role:\s*["']customer["']/);
  assert.match(exportedBlock(source, "getOrCreateCurrent"), /passwordHash:\s*undefined/);
  assert.match(exportedBlock(source, "list"), /requireAdmin\(ctx\)/);
  assert.match(exportedBlock(source, "getById"), /requireSelfOrAdmin\(ctx, args\.id\)/);
  assert.match(exportedBlock(source, "update"), /requireSelfOrAdmin\(ctx, args\.id\)/);
  const acceptLegal = exportedBlock(source, "acceptLegal");
  assert.match(acceptLegal, /requireUser\(ctx\)/);
  assert.match(acceptLegal, /insert\(["']auditEvents["']/);
  assert.match(acceptLegal, /legalVersion:\s*LEGAL_VERSION/);
});

test("checkout derives ownership from auth and enforces current consent", async () => {
  const [source, users, dashboard] = await Promise.all([
    read("convex/payments.ts"),
    read("convex/users.ts"),
    read("src/pages/UserDashboard.tsx"),
  ]);
  const actionArgs = source.slice(
    source.indexOf("export const createCheckoutSession"),
    source.indexOf("handler:"),
  );
  const currentVersion = source.match(/LEGAL_VERSION\s*=\s*["']([^"']+)/)?.[1];

  assert.ok(currentVersion);
  assert.match(users, new RegExp(`LEGAL_VERSION\\s*=\\s*["']${currentVersion}["']`));
  assert.match(dashboard, new RegExp(`CURRENT_LEGAL_VERSION\\s*=\\s*["']${currentVersion}["']`));
  assert.doesNotMatch(actionArgs, /userId/);
  assert.match(source, /requireIdentity\(ctx\)/);
  assert.match(source, /legalVersion !== LEGAL_VERSION/);
  assert.match(source, /client_reference_id/);
  assert.match(source, /amountTotal !== payment\.amountCents/);
});

test("Stripe webhook verification uses the raw signed body", async () => {
  const source = await read("convex/http.ts");

  assert.match(source, /request\.text\(\)/);
  assert.match(source, /function sameString/);
  assert.match(source, /crypto\.subtle\.sign/);
  assert.match(source, /stripe-signature/);
  assert.match(source, /checkout\.session\.async_payment_failed/);
});

test("Vercel deploys Convex and sends baseline browser protections", async () => {
  const config = JSON.parse(await read("vercel.json"));
  const headers = Object.fromEntries(
    config.headers[0].headers.map(({ key, value }) => [key, value]),
  );

  assert.match(config.buildCommand, /convex deploy/);
  assert.match(config.buildCommand, /VITE_CONVEX_URL/);
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["Permissions-Policy"], "camera=(), microphone=(), geolocation=()");
});
