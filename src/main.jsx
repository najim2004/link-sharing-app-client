import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
