import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefetch, setIsRefetch] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myLinksLoading, setMyLinksLoading] = useState(true);
  const [myLinks, setMyLinks] = useState([]);
  const axiosPublic = useAxiosPublic();

  const logout = async () => {
    setIsUserLoading(true);
    try {
      const { data } = await axiosPublic.post("/api/users/logout");
      if (data?.success) {
        setUser(null);
        setMyLinks(null);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  const contextData = {
    user,
    setUser,
    setIsUserLoading,
    platforms,
    setPlatforms,
    setLoading,
    loading,
    myLinks,
    setMyLinks,
    setMyLinksLoading,
    myLinksLoading,
    logout,
    isUserLoading,
    isRefetch,
    setIsRefetch,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
