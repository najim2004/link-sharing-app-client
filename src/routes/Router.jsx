import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home } from "../pages/home/Home";
import { Profile } from "../pages/profile/Profile";
import { Preview } from "../pages/preview/Preview";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signup/SignUp";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/preview",
        element: (
          <PrivateRoute>
            <Preview />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
