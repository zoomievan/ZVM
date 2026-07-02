import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function vanFromDoc(doc: any) {
  return {
    id: doc._id,
    name: doc.name,
    status: doc.status,
    location: doc.location,
    sessionsToday: doc.sessionsToday,
    totalSessions: doc.totalSessions,
    createdAt: new Date(doc.createdAt).toISOString(),
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const vans = await ctx.db.query("fleetVans").collect();
    return vans.map(vanFromDoc);
  },
});

export const add = mutation({
  args: {
    van: v.object({
      name: v.string(),
      status: v.union(v.literal("Active"), v.literal("Maintenance"), v.literal("Offline")),
      location: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("fleetVans", {
      ...args.van,
      sessionsToday: 0,
      totalSessions: 0,
      createdAt: now,
      updatedAt: now,
    });
    const van = await ctx.db.get(id);
    return vanFromDoc(van);
  },
});

export const update = mutation({
  args: {
    id: v.id("fleetVans"),
    updates: v.object({
      name: v.optional(v.string()),
      status: v.optional(v.union(v.literal("Active"), v.literal("Maintenance"), v.literal("Offline"))),
      location: v.optional(v.string()),
      sessionsToday: v.optional(v.number()),
      totalSessions: v.optional(v.number()),
      createdAt: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { createdAt, ...updates } = args.updates;
    void createdAt;
    await ctx.db.patch(args.id, { ...updates, updatedAt: Date.now() });
    const van = await ctx.db.get(args.id);
    return vanFromDoc(van);
  },
});

export const incrementSession = mutation({
  args: { id: v.id("fleetVans") },
  handler: async (ctx, args) => {
    const van = await ctx.db.get(args.id);
    if (!van) throw new Error("Van not found");
    await ctx.db.patch(args.id, {
      sessionsToday: van.sessionsToday + 1,
      totalSessions: van.totalSessions + 1,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get(args.id);
    return vanFromDoc(updated);
  },
});

export const remove = mutation({
  args: { id: v.id("fleetVans") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
