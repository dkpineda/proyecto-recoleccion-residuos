// src/routes/routeTypes.ts
export const APP_ROUTES = {
  auth: "/auth",
  dashboard: "/dashboard",
  reports: "/reports",
  signup: "/signup",
} as const;

export type AppRouteKeys = keyof typeof APP_ROUTES;
