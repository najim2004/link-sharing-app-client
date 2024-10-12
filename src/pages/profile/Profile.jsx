import { useState } from "react";
import { DetailsUpdateForm } from "../../components/profile/DetailsUpdateForm";
import { ProfilePicture } from "../../components/profile/ProfilePicture";
import { useAppContext } from "../../provider/AppProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const Profile = () => {
  const { user } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosSecure.patch(`/api/users`, data);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["user"]);
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
  const handleUpdate = (data) => {
    setIsLoading(true);
    mutateAsync(data);
  };
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
      <ProfilePicture profilePictureUrl={user.profilePicture} />
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
