import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home } from "../pages/home/Home";
import { Profile } from "../pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
