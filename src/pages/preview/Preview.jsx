import { Helmet } from "react-helmet-async";
import { Template } from "../../components/preview/Template";
import { useGetUserLinksQuery } from "../../redux/api/linksApiSlice";
import { useSelector } from "react-redux";

export const Preview = () => {
  const { data: myLinks } = useGetUserLinksQuery();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="">
      <Helmet>
        <title>Preview || Dev Links 24</title>
      </Helmet>
      <Template myLinks={myLinks} user={user} />
    </div>
  );
};
