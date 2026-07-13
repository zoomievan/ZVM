import { ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";
import { hasClerkConfig, hasConvexConfig } from "./runtime";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

export const convex = hasConvexConfig && hasClerkConfig && convexUrl ? new ConvexReactClient(convexUrl) : null;
export const usesConvexBackend = Boolean(convex);
export { api };
