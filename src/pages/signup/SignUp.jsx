import { FaRegEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Navbar } from "../../shared/Navbar";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "../../components/Loading";
import { useAppContext } from "../../provider/AppProvider";
import useImageUpload from "../../hooks/useImageUpload";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { user, isUserLoading } = useAppContext();
  const axiosPublic = useAxiosPublic();
  const [viewPassword, setViewPassword] = useState(false);
  const [anyError, setAnyError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const {
    uploadImage,
    imageUrl,
    uploadError,
    isLoading: isUploading,
    isSuccess,
  } = useImageUpload();
  useEffect(() => {
    setIsLoading(isUploading);
  }, [isUploading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosPublic.post(`/api/users/register`, data);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Registration successful!");
        setAnyError(null);
        navigator("/login");
      } else {
        toast.error(data.message || "Failed to register, try again!");
        setAnyError(data.message);
      }
      setIsLoading(true);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to register, try again!");
      setIsLoading(true);
    },
  });

  if (isUserLoading) return <Loading />;
  if (user) return <Navigate to={"/"} />;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const mutatedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      profilePicture: imageUrl,
    };
    mutation.mutateAsync(mutatedData);
  };

  const togglePasswordView = () => {
    setViewPassword(!viewPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formattedName =
        file.name.length > 15
          ? `${file.name.slice(0, 15)}...${file.name.slice(-3)}`
          : file.name;
      setFileName(formattedName);
      uploadImage(file);
    }
  };

  return (
    <div className="bg-white w-screen h-screen absolute top-0 left-0 flex flex-col">
      <Helmet>
        <title>SignUp || Dev Links 24</title>
      </Helmet>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 w-full flex-grow">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-secondary">
            Create Your Account
          </h3>
          <p className="text-sm text-gray-500 font-medium text-center">
            Welcome! Please enter your details
          </p>
        </div>

        <button
          onClick={() => alert("Coming soon...")}
          className="mt-3 shadow-sm bg-transparent outline-none border border-gray-300 text-gray-500 text-base font-semibold rounded-md w-full max-w-[350px] p-2 flex items-center gap-2 justify-center"
        >
          <FcGoogle className="text-lg" /> Sign up with Google
        </button>

        <div className="flex items-center w-full max-w-[350px] gap-1 text-gray-500 font-medium">
          <hr className="flex-1 border-b" />
          OR
          <hr className="flex-1 border-b" />
        </div>

        <div className="w-full max-w-[350px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* First Name Input */}
            <div className="mb-2 w-full">
              <label
                htmlFor="firstName"
                className="block mb-1 text-base font-semibold text-secondary"
              >
                Your First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "Your first name is required",
                })}
                className="shadow-sm bg-transparent outline-none border border-gray-300 text-secondary text-sm rounded-md block w-full p-2.5"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <span className="text-red-600 font-medium">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            {/* Last Name Input */}
            <div className="mb-2 w-full">
              <label
                htmlFor="lastName"
                className="block mb-1 text-base font-semibold text-secondary"
              >
                Your Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Your last name is required",
                })}
                className="shadow-sm bg-transparent outline-none border border-gray-300 text-secondary text-sm rounded-md block w-full p-2.5"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="text-red-600 font-medium">
                  {errors.lastName?.message}
                </span>
              )}
            </div>

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
                {...register("email", { required: "Your email is required" })}
                className="shadow-sm bg-transparent outline-none border border-gray-300 text-secondary text-sm rounded-md block w-full p-2.5"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-600 font-medium">
                  {errors.email?.message}
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
              {errors.password && (
                <span className="text-red-600 font-medium">
                  {errors.password?.message}
                </span>
              )}
            </div>

            {/* File Input */}
            <div className="mb-3">
              <label
                className="mb-1 text-base font-semibold text-secondary w-full p-2 border-2 border-dashed flex justify-center items-center rounded-md"
                htmlFor="file_input"
              >
                {isLoading
                  ? "Uploading..."
                  : isSuccess
                  ? fileName || "Change Your Photo" // Show file name if available
                  : "Upload Your Photo"}
              </label>
              <input
                className="hidden"
                id="file_input"
                {...register("photo", { required: "Your photo is required" })}
                type="file"
                onChange={handleFileChange}
              />
              {errors.photo && (
                <span className="text-red-600 font-medium">
                  {errors.photo?.message}
                </span>
              )}
              {uploadError && (
                <span className="text-red-600 font-medium">{uploadError}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-primary hover:bg-primary/90 border focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                <span className="w-max mx-auto">Sign Up</span>
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>

        {anyError && (
          <p className="text-red-500 font-semibold mt-3 text-sm">{anyError}</p>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
