import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myLinksLoading, setMyLinksLoading] = useState(true);
  const [myLinks, setMyLinks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getuser = async () => {
      setIsUserLoading(true);
      try {
        const { data } = await axiosSecure.get(`/api/users`);
        data.success ? setUser(data.user) : setUser(null);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsUserLoading(false);
      }
    };
    getuser();
  }, [axiosSecure, isLogin]);

  // useEffect(() => {}, [user, links]);

  const logout = async () => {
    setIsUserLoading(true);
    try {
      const { data } = await axiosSecure.post("/api/users/logout");
      if (data.success) {
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
    platforms,
    setPlatforms,
    setLoading,
    loading,
    myLinks,
    setMyLinks,
    setMyLinksLoading,
    logout,
    user,
    setUser,
    isUserLoading,
    setIsUserLoading,
    isLogin,
    setIsLogin,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
