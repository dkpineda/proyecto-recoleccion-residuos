export const APP_ROUTES = {
  //auth
  auth: "/",
  signup: "/signup",
} as const;

export type AppRouteKeys = keyof typeof APP_ROUTES;
