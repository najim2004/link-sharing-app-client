import axios from "axios";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  //   const navigate = useNavigate();

  // Memoizing the axios instance to prevent unnecessary re-creations on each render
  const axiosSecureInstance = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_BASEURL,
        withCredentials: true, // Send cookies with requests
      }),
    []
  );

  //   useEffect(() => {
  //     const responseInterceptor = (response) => response;

  //     const errorInterceptor = (error) => {
  //       const { response } = error;

  //       // Checking if the error response is 401 (Unauthorized) or 403 (Forbidden)
  //       if (response?.status === 401 || response?.status === 403) {
  //         console.error("Authorization error detected:", response.statusText);

  //         // Log the user out and navigate to login page

  //       }

  //       return Promise.reject(error); // Reject the error to handle it further
  //     };

  //     // Adding interceptors
  //     const interceptorId = axiosSecureInstance.interceptors.response.use(
  //       responseInterceptor,
  //       errorInterceptor
  //     );

  //     // Cleanup the interceptor when component unmounts or dependencies change
  //     return () => {
  //       axiosSecureInstance.interceptors.response.eject(interceptorId);
  //     };
  //   }, [navigate, axiosSecureInstance]);

  return axiosSecureInstance;
};

export default useAxiosSecure;
