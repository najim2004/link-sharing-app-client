import axios from "axios";
import { useEffect, useMemo } from "react";
import { useAppContext } from "../provider/AppProvider";

const useAxiosSecure = () => {
  const { setUser, setIsUserLoading } = useAppContext();

  const axiosSecureInstance = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_BASEURL,
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    const interceptor = axiosSecureInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("error tracked in the interceptors", error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
          setIsUserLoading(true);
          try {
            const { data } = await axiosSecureInstance.post(
              "/api/users/logout"
            );
            if (data?.success) {
              setUser(null);
            }
          } catch (err) {
            console.error(err);
          } finally {
            setIsUserLoading(false);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecureInstance.interceptors.response.eject(interceptor);
    };
  }, [axiosSecureInstance, setUser, setIsUserLoading]);

  return axiosSecureInstance;
};

export default useAxiosSecure;
