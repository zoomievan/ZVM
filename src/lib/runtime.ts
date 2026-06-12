export const hasConvexConfig = Boolean(import.meta.env.VITE_CONVEX_URL);
export const isProductionBuild = import.meta.env.PROD;
export const isProductionBackendReady = hasConvexConfig;

