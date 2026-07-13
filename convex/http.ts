import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function sameString(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return mismatch === 0;
}

async function hasValidStripeSignature(payload: string, header: string, secret: string) {
  const timestamp = header.split(",").find(part => part.startsWith("t="))?.slice(2);
  const signatures = header.split(",").filter(part => part.startsWith("v1=")).map(part => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const sentAt = Number(timestamp);
  if (!Number.isFinite(sentAt) || Math.abs(Date.now() / 1000 - sentAt) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`)));
  return signatures.some(signature => sameString(signature, expected));
}

const http = httpRouter();

http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret || !(await hasValidStripeSignature(payload, signature, webhookSecret))) {
      return new Response("Invalid Stripe signature", { status: 400 });
    }

    let event: any;
    try {
      event = JSON.parse(payload);
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const session = event.data?.object;
    if (session?.id) {
      let status: "paid" | "cancelled" | "failed" | undefined;
      if (event.type === "checkout.session.completed" && session.payment_status === "paid") status = "paid";
      if (event.type === "checkout.session.async_payment_succeeded") status = "paid";
      if (event.type === "checkout.session.expired") status = "cancelled";
      if (event.type === "checkout.session.async_payment_failed") status = "failed";

      if (status) {
        await ctx.runMutation(internal.payments.markCheckoutSession, {
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          userId: typeof session.client_reference_id === "string" ? session.client_reference_id : undefined,
          amountTotal: typeof session.amount_total === "number" ? session.amount_total : undefined,
          currency: typeof session.currency === "string" ? session.currency : undefined,
          status,
        });
      }
    }

    return Response.json({ received: true });
  }),
});

export default http;
