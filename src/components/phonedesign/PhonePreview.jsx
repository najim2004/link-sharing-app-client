import { useGetUserLinksQuery } from "../../redux/api/linksApiSlice";
import { Phone } from "./Phone";

export const PhonePreview = () => {
  const { data: myLinks, isLoading } = useGetUserLinksQuery();
  return (
    <section className="bg-white py-4 px-6 rounded-lg hidden lg:flex flex-col justify-center items-center">
      <h3 className="mb-2 text-secondary font-semibold">Phone Preview</h3>
      {isLoading ? (
        <>
          <h4 className="text-center">Loading...</h4>
        </>
      ) : (
        <Phone myLinks={myLinks} />
      )}
    </section>
  );
};
