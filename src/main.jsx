import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./provider/AppProvider.jsx";
import { DataFetchProvider } from "./provider/DataFetchProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <DataFetchProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </DataFetchProvider>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
