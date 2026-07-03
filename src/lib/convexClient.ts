import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { hasConvexConfig } from "./runtime";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

export const convex = hasConvexConfig && convexUrl ? new ConvexHttpClient(convexUrl) : null;
export const usesConvexBackend = Boolean(convex);

export const api = {
  bookings: {
    list: makeFunctionReference<"query", Record<string, never>, any[]>("bookings:list"),
  },
  cms: {
    get: makeFunctionReference<"query", Record<string, never>, any>("cms:get"),
    update: makeFunctionReference<"mutation", { settings: any }, any>("cms:update"),
  },
  fleet: {
    list: makeFunctionReference<"query", Record<string, never>, any[]>("fleet:list"),
    add: makeFunctionReference<"mutation", { van: any }, any>("fleet:add"),
    update: makeFunctionReference<"mutation", { id: any; updates: any }, any>("fleet:update"),
    incrementSession: makeFunctionReference<"mutation", { id: any }, any>("fleet:incrementSession"),
    remove: makeFunctionReference<"mutation", { id: any }, void>("fleet:remove"),
  },
  fsaZones: {
    list: makeFunctionReference<"query", Record<string, never>, any[]>("fsaZones:list"),
    add: makeFunctionReference<"mutation", { zone: any }, any>("fsaZones:add"),
    update: makeFunctionReference<"mutation", { id: any; updates: any }, any>("fsaZones:update"),
    remove: makeFunctionReference<"mutation", { id: any }, void>("fsaZones:remove"),
  },
  users: {
    list: makeFunctionReference<"query", Record<string, never>, any[]>("users:list"),
    getById: makeFunctionReference<"query", { id: any }, any>("users:getById"),
    getByEmail: makeFunctionReference<"query", { email: string }, any>("users:getByEmail"),
    getByAuthProviderUserId: makeFunctionReference<"query", { authProviderUserId: string }, any>("users:getByAuthProviderUserId"),
    create: makeFunctionReference<"mutation", any, any>("users:create"),
    update: makeFunctionReference<"mutation", { id: any; updates: any }, any>("users:update"),
  },
  vaccines: {
    list: makeFunctionReference<"query", Record<string, never>, any[]>("vaccines:list"),
    add: makeFunctionReference<"mutation", { record: any }, any>("vaccines:add"),
    approve: makeFunctionReference<"mutation", { id: any }, any>("vaccines:approve"),
    reject: makeFunctionReference<"mutation", { id: any }, any>("vaccines:reject"),
    remove: makeFunctionReference<"mutation", { id: any }, void>("vaccines:remove"),
  },
};

export function isoToMillis(value: string | null | undefined): number | null {
  if (!value) return null;
  const millis = Date.parse(value);
  return Number.isNaN(millis) ? null : millis;
}
