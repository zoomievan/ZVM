export const hasConvexConfig = Boolean(import.meta.env.VITE_CONVEX_URL);
export const hasClerkConfig = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
export const isProductionBuild = import.meta.env.PROD;
export const isProductionBackendReady = hasConvexConfig && hasClerkConfig;
