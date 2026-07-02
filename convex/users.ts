import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const address = v.object({
  line1: v.string(),
  city: v.string(),
  province: v.string(),
  postalCode: v.string(),
});

const dog = v.object({
  name: v.string(),
  breed: v.string(),
  weight: v.number(),
  age: v.number(),
  energyLevel: v.string(),
  reactivityNotes: v.string(),
});

const vaccines = v.object({
  rabiesFileName: v.string(),
  dhppFileName: v.string(),
  vetName: v.string(),
  vetPhone: v.string(),
});

const userPatch = {
  email: v.optional(v.string()),
  passwordHash: v.optional(v.string()),
  passwordSalt: v.optional(v.string()),
  role: v.optional(v.union(v.literal("customer"), v.literal("admin"))),
  name: v.optional(v.string()),
  phone: v.optional(v.string()),
  address: v.optional(address),
  dog: v.optional(dog),
  vaccines: v.optional(vaccines),
  legalAccepted: v.optional(v.boolean()),
  legalAcceptedAt: v.optional(v.union(v.number(), v.null())),
};

function userFromDoc(doc: any) {
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    passwordSalt: doc.passwordSalt,
    role: doc.role,
    name: doc.name,
    phone: doc.phone,
    address: doc.address,
    dog: doc.dog,
    vaccines: doc.vaccines,
    legalAccepted: doc.legalAccepted,
    legalAcceptedAt: doc.legalAcceptedAt ? new Date(doc.legalAcceptedAt).toISOString() : null,
    createdAt: new Date(doc.createdAt).toISOString(),
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map(userFromDoc);
  },
});

export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    return user ? userFromDoc(user) : null;
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();
    return user ? userFromDoc(user) : null;
  },
});

export const create = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    passwordSalt: v.string(),
    role: v.union(v.literal("customer"), v.literal("admin")),
    name: v.string(),
    phone: v.string(),
    address,
    dog,
    vaccines,
    legalAccepted: v.boolean(),
    legalAcceptedAt: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("users", {
      ...args,
      email: args.email.toLowerCase(),
      legalAcceptedAt: args.legalAcceptedAt ?? undefined,
      createdAt: now,
      updatedAt: now,
    });
    const user = await ctx.db.get(id);
    return userFromDoc(user);
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    updates: v.object(userPatch),
  },
  handler: async (ctx, args) => {
    const updates = {
      ...args.updates,
      email: args.updates.email?.toLowerCase(),
      legalAcceptedAt: args.updates.legalAcceptedAt ?? undefined,
      updatedAt: Date.now(),
    };
    await ctx.db.patch(args.id, updates);
    const user = await ctx.db.get(args.id);
    return userFromDoc(user);
  },
});
