import { Template } from "../../components/preview/Template";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useGetLinkByIdQuery } from "../../redux/api/linksApiSlice";
import { useSelector } from "react-redux";

export const PublicPreview = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, isError, error } = useGetLinkByIdQuery(id);
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
          data.user?.firstName + " " + data.user?.lastName
        } || Dev Links 24`}</title>
      </Helmet>
      <Template myLinks={data?.links} user={data?.user} />
    </>
  );
};
