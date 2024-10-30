import { FaRegEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Navbar } from "../../shared/Navbar";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAppContext } from "../../provider/AppProvider";
import { Loading } from "../../components/Loading";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const { isRefetch, setIsRefetch, user, isUserLoading } = useAppContext();
  const [viewPassword, setViewPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [anyError, setAnyError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosSecure.post(`/api/users/login`, data);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Loged In successful!");
        setIsRefetch(!isRefetch);
        setAnyError(null);
      } else {
        toast.error(data.message || "Failed to login try again!");
        setAnyError(data.message);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to login try again!");
      setIsLoading(false);
    },
  });
  if (isUserLoading) return <Loading />;
  if (user) return <Navigate to={"/"} />;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const mutatedData = {
      email: data.email,
      password: data.password,
    };
    mutation.mutateAsync(mutatedData);
  };

  const togglePasswordView = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className="bg-white w-screen h-screen absolute top-0 left-0 flex flex-col">
      <Helmet>
        <title>Login || Dev Links 24</title>
      </Helmet>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 w-full flex-grow">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-secondary">
            Login In Your Account
          </h3>
          <p className="text-sm text-gray-500 font-medium text-center">
            Welcome Back! Please enter your details
          </p>
        </div>

        <button
          onClick={() =>
            alert("adding soon..!Please login with email and password")
          }
          className="mt-3 shadow-sm bg-transparent outline-none border border-gray-300 text-gray-500 text-base font-semibold rounded-md w-full max-w-[350px] p-2 flex items-center gap-2 justify-center"
        >
          <FcGoogle className="text-lg" /> Login with Google
        </button>

        <div className="flex items-center w-full max-w-[350px] gap-1 text-gray-500 font-medium">
          <hr className="flex-1 border-b" />
          OR
          <hr className="flex-1 border-b" />
        </div>

        <div className="w-full max-w-[350px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Email Input */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mb-1 text-base font-semibold text-secondary"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="yourname@gmail.com"
                className="shadow-sm bg-transparent outline-none border border-gray-300 text-secondary text-sm rounded-md block w-full p-2.5"
              />
              {errors?.email && (
                <span className="text-red-600 font-medium">
                  {errors?.email.message}
                </span>
              )}
            </div>
            {/* Password Input */}
            <div className="relative mb-2">
              <label
                htmlFor="password"
                className="block mb-1 text-base font-semibold text-secondary"
              >
                Your Password
              </label>
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Your password is required",
                })}
                className="shadow-sm bg-transparent outline-none border border-gray-300 text-secondary text-sm rounded-md block w-full p-2.5"
                placeholder="Enter password"
              />
              <span
                onClick={togglePasswordView}
                className="absolute right-2 top-10 text-secondary"
              >
                {viewPassword ? (
                  <FaRegEye className="cursor-pointer" />
                ) : (
                  <FaEyeSlash className="cursor-pointer" />
                )}
              </span>
              {errors?.password && (
                <span className="text-red-600 font-medium">
                  {errors?.password.message}
                </span>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-primary hover:bg-primary/90 border focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                <span className="w-max mx-auto">Login</span>
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        {anyError && (
          <p className="text-red-500 font-semibold my-1">{anyError}</p>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
