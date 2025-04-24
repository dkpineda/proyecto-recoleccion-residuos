export const APP_ROUTES = {
  //auth
  auth: "/",
} as const;

export type AppRouteKeys = keyof typeof APP_ROUTES;
