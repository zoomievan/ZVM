import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const defaultSettings = {
  heroTagline: "A Professional Dog Gym That Comes to You",
  baseSessionRate: 35,
  weeklyPackRate: 110,
  eightPackRate: 200,
  emergencyBannerText: "",
  emergencyBannerActive: false,
};

function settingsFromDoc(doc: any) {
  return {
    heroTagline: doc.heroTagline,
    baseSessionRate: doc.baseSessionRate,
    weeklyPackRate: doc.weeklyPackRate,
    eightPackRate: doc.eightPackRate,
    emergencyBannerText: doc.emergencyBannerText,
    emergencyBannerActive: doc.emergencyBannerActive,
  };
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("cmsSettings").first();
    return settings ? settingsFromDoc(settings) : defaultSettings;
  },
});

export const update = mutation({
  args: {
    settings: v.object({
      heroTagline: v.string(),
      baseSessionRate: v.number(),
      weeklyPackRate: v.number(),
      eightPackRate: v.number(),
      emergencyBannerText: v.string(),
      emergencyBannerActive: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db.query("cmsSettings").first();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args.settings, updatedAt: now });
    } else {
      await ctx.db.insert("cmsSettings", { ...args.settings, createdAt: now, updatedAt: now });
    }
    return args.settings;
  },
});
