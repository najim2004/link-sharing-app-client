import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home } from "../pages/home/Home";
import { Profile } from "../pages/profile/Profile";
import { Preview } from "../pages/preview/Preview";

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
      {
        path: "/preview/:id",
        element: <Preview />,
      },
    ],
  },
]);

export default router;
