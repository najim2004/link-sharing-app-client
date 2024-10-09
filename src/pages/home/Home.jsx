import { AddLink } from "../../components/home/AddLink";
import { AllAddedLinks } from "../../components/home/AllAddedLinks";

export const Home = () => {
  return (
    <div className="bg-white py-4 px-6 rounded-lg">
      <section className="mt-3.5">
        <h2 className="text-3xl font-bold text-secondary mb-3.5">
          Customize your links
        </h2>
        <p className=" text-secondary">
          Add/edit/remove links below and then share All your profile with the
          world.
        </p>
      </section>
      <AddLink />
      <AllAddedLinks />
    </div>
  );
};
