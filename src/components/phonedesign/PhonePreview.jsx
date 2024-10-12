import { useAppContext } from "../../provider/AppProvider";
import { Phone } from "./Phone";

export const PhonePreview = () => {
  const { myLinks } = useAppContext();
  return (
    <section className="bg-white py-4 px-6 rounded-lg hidden lg:flex flex-col justify-center items-center">
      <h3 className="mb-2 text-secondary font-semibold">Phone Preview</h3>
      <Phone myLinks={myLinks} />
    </section>
  );
};
