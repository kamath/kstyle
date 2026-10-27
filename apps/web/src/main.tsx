import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiError } from "./example/api.ts";
import { router } from "./router.tsx";
import { toast, ToastProvider } from "./ui/toast.tsx";
import "./ui/theme.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // One retry, none for 4xx: those won't fix themselves.
      retry: (count, error) => count < 1 && !(error instanceof ApiError && error.status < 500),
      staleTime: 30_000,
    },
    // Mutations that show their error elsewhere (a form field) pass their own onError.
    mutations: { onError: (e) => toast.error(e.message) },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);
