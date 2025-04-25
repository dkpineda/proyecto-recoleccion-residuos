export const APP_ROUTES = {
  //auth
  auth: "/",
  reports: "/reports", //Reportes
} as const;

export type AppRouteKeys = keyof typeof APP_ROUTES;
