import { useEffect, useState } from "react";
import { DetailsUpdateForm } from "../../components/profile/DetailsUpdateForm";
import { ProfilePicture } from "../../components/profile/ProfilePicture";
import toast from "react-hot-toast";
import useImageUpload from "../../hooks/useImageUpload";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../redux/api/usersApiSlice";

export const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    uploadImage,
    imageUrl,
    uploadError,
    isLoading: isUploading,
    isSuccess,
  } = useImageUpload();
  const { user } = useSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    if (isSuccess && !isUploading) {
      updateProfile({ profilePicture: imageUrl });
    }
  }, [isSuccess, updateProfile, imageUrl, isUploading]);

  const profilePictureUpdater = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };
  const handleUpdate = async (data) => {
    try {
      const { data: res, error } = await updateProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
      } else {
        toast.error(
          res.message || error.message || "Failed to update profile."
        );
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      toast.error(error.message || "Failed to update profile.");
    }
  };
  return (
    <div className="bg-white py-4 px-6 rounded-lg">
      <Helmet>
        <title>{`${
          user?.firstName + " " + user?.lastName
        } || Dev Links 24`}</title>
      </Helmet>
      <section className="mt-3.5">
        <h2 className="text-3xl font-bold text-secondary mb-3.5">
          Profile Details
        </h2>
        {uploadError ? (
          <p className="text-red-500">{uploadError}</p>
        ) : (
          <p className="text-secondary">
            Add your detail to create a personal touch to your profile.
          </p>
        )}
      </section>
      <ProfilePicture
        profilePictureUrl={user.profilePicture}
        profilePictureUpdater={profilePictureUpdater}
        isUploading={isUploading}
      />
      <DetailsUpdateForm
        userDetails={user}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
      />
    </div>
  );
};
