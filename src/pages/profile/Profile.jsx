import { useEffect, useState } from "react";
import { DetailsUpdateForm } from "../../components/profile/DetailsUpdateForm";
import { ProfilePicture } from "../../components/profile/ProfilePicture";
import { useAppContext } from "../../provider/AppProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useImageUpload from "../../hooks/useImageUpload";
import { Helmet } from "react-helmet-async";

export const Profile = () => {
  const { user, setUser } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    uploadImage,
    imageUrl,
    uploadError,
    isLoading: isUploading,
    isSuccess,
  } = useImageUpload();

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosSecure.patch(`/api/users`, data);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Profile updated successfully!");
        setUser(data.user);
        setIsEdit(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.message || "Failed to update profile.");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message || "Failed to update profile.");
    },
  });
  useEffect(() => {
    if (isSuccess) {
      mutateAsync({ profilePicture: imageUrl });
    }
    if (isUploading) {
      setIsLoading(isUploading);
    }
  }, [isSuccess, mutateAsync, imageUrl, isUploading]);

  const profilePictureUpdater = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };
  const handleUpdate = (data) => {
    setIsLoading(true);
    mutateAsync(data);
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
