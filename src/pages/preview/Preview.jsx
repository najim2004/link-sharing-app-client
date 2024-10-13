import { Helmet } from "react-helmet-async";
import { Template } from "../../components/preview/Template";
import { useAppContext } from "../../provider/AppProvider";

export const Preview = () => {
  const { myLinks, user } = useAppContext();
  return (
    <div className="">
      <Helmet>
        <title>Preview || Dev Links 24</title>
      </Helmet>
      <Template myLinks={myLinks} user={user} />
    </div>
  );
};
