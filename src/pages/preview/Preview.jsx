import { Template } from "../../components/preview/Template";
import { useAppContext } from "../../provider/AppProvider";

export const Preview = () => {
  const { myLinks, user } = useAppContext();
  return (
    <div className="">
      <Template myLinks={myLinks} user={user} />
    </div>
  );
};
