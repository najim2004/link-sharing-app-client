import { useQuery } from "@tanstack/react-query";
import { Template } from "../../components/preview/Template";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { useAppContext } from "../../provider/AppProvider";
import toast from "react-hot-toast";

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
  const { user: AuthUser } = useAppContext();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [userLinks, setUserLinks] = useState();
  const [loading, setLoading] = useState(true);
  const userDetailsWithLinks = FetchUserDetailsAndLinks(id);

  useEffect(() => {
    if (!AuthUser) {
      try {
        if (userDetailsWithLinks?.userData?.success) {
          setUser(userDetailsWithLinks?.userData?.user);
          setUserLinks(userDetailsWithLinks?.userData?.links);
        }

        setLoading(userDetailsWithLinks?.isLoading);

        if (userDetailsWithLinks?.error)
          toast.error("Something went wrong! Please try again later.");
      } catch (error) {
        console.log(error);
      }
    }
  }, [setUserLinks, setUser, setLoading, userDetailsWithLinks, AuthUser]);
  if (AuthUser) {
    setUser(null);
    return null;
  }
  if (loading) return <Loading />;
  return (
    <>
      <Template myLinks={userLinks} user={user} />
    </>
  );
};
