import { useQuery } from "@tanstack/react-query";
import { Template } from "../../components/preview/Template";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useGetLinkByIdQuery } from "../../redux/api/linksApiSlice";
import { useSelector } from "react-redux";

export const FetchUserDetailsAndLinks = (id) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userDetailAndLinks"],
    enabled: !!id,
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/users/${id}`);
      return response.data;
    },
  });
  return { userData, isLoading, isError, error, refetch };
};

export const PublicPreview = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, isError, error } = useGetLinkByIdQuery(id, {
    skip: user,
  });

  useEffect(() => {
    if (!user) {
      if (isError)
        toast.error(
          error.message || "Something went wrong! Please try again later."
        );
    }
  }, [error, isError, user]);
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>{`${
          user?.firstName + " " + user?.lastName
        } || Dev Links 24`}</title>
      </Helmet>
      <Template myLinks={data?.userData?.links} user={data?.userData?.user} />
    </>
  );
};
