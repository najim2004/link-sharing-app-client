import { DetailsUpdateForm } from "../../components/profile/DetailsUpdateForm";
import { ProfilePicture } from "../../components/profile/ProfilePicture";

export const Profile = () => {
  return (
    <div className="bg-white py-4 px-6 rounded-lg">
      <section className="mt-3.5">
        <h2 className="text-3xl font-bold text-secondary mb-3.5">
          Profile Details
        </h2>
        <p className=" text-secondary">
          Add your detail to create a personal touch to your profile.
        </p>
      </section>
      <ProfilePicture />
      <DetailsUpdateForm />
    </div>
  );
};
