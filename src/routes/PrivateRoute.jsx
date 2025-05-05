import PropTypes from "prop-types";
import { Loading } from "../components/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { PublicPreview } from "../pages/publicpreview/PublicPreview";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const location = useLocation();
  const isProfileRoute = location.pathname.includes("/profile");
  if (isLoading) {
    return <Loading />;
  }
  if (isProfileRoute && !user) return <PublicPreview />;

  if (user) return children;

  return <Navigate to={"/login"} state={location?.pathname} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
