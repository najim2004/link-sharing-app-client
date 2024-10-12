import PropTypes from "prop-types";
import { useAppContext } from "../provider/AppProvider";
import { Loading } from "../components/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { PublicPreview } from "../pages/publicpreview/PublicPreview";

export const PrivateRoute = ({ children }) => {
  const { user, isUserLoading } = useAppContext();
  const location = useLocation();
  const isProfileRoute = location.pathname.includes("/profile");
  if (isUserLoading) {
    return <Loading />;
  }
  if (isProfileRoute && !user) return <PublicPreview />;

  if (user) return children;

  return <Navigate to={"/login"} state={location?.pathname} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
