import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./provider/AppProvider.jsx";
import { DataFetchProvider } from "./provider/DataFetchProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <DataFetchProvider>
          <RouterProvider router={router} />
        </DataFetchProvider>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
