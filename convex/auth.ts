import type { MutationCtx, QueryCtx } from "./_generated/server";

type AuthContext = Pick<QueryCtx, "auth">;
type DatabaseContext = QueryCtx | MutationCtx;

export async function requireIdentity(ctx: AuthContext) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated.");
  return identity;
}

export async function requireUser(ctx: DatabaseContext) {
  const identity = await requireIdentity(ctx);
  const user = await ctx.db
    .query("users")
    .withIndex("by_auth_provider_user_id", q => q.eq("authProviderUserId", identity.subject))
    .unique();

  if (!user) throw new Error("User profile not found.");
  return user;
}

export async function requireAdmin(ctx: DatabaseContext) {
  const user = await requireUser(ctx);
  if (user.role !== "admin") throw new Error("Admin access required.");
  return user;
}

export async function requireSelfOrAdmin(ctx: DatabaseContext, userId: string) {
  const user = await requireUser(ctx);
  if (user._id !== userId && user.role !== "admin") throw new Error("Access denied.");
  return user;
}
