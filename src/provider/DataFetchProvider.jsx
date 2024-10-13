import PropTypes from "prop-types";
import { useAppContext } from "./AppProvider";
import { useCallback, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const DataFetchProvider = ({ children }) => {
  const { user, setUser, setIsUserLoading, isRefetch } = useAppContext();
  const axiosSecure = useAxiosSecure();
  const getuser = useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsUserLoading(true);
      try {
        const { data } = await axiosSecure.get(`/api/users`);
        data.success ? setUser(data?.user) : setUser(null);
      } catch (error) {
        console.log(error);
      } finally {
        if (showLoading) setIsUserLoading(false);
      }
    },
    [axiosSecure, setUser, setIsUserLoading]
  );

  useEffect(() => {
    getuser();
  }, [getuser, isRefetch]);

  useEffect(() => {
    let interval;
    if (user) {
      interval = setInterval(() => {
        getuser(false);
      }, 600 * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [user, getuser]);

  return <>{children}</>;
};

DataFetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
