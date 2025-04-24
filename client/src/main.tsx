import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import { PageSpinner } from "./libs/components/ui";
import { AppRoutes } from "./routes/routes";
import "./styles/global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});


const App: React.FC = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<PageSpinner />}>
          <Toaster position="top-center" richColors />
          <AppRoutes />
        </Suspense>
      </QueryClientProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
