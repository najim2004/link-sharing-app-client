import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoading } from "../redux/features/user/userSlice";

const useAxiosSecure = () => {
  const { setUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
          dispatch(setLoading(true));
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
            dispatch(setLoading(false));
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
