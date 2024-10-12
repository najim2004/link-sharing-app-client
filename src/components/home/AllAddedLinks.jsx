import { useState } from "react";
import { useAppContext } from "../../provider/AppProvider";
import DeleteModal from "./deleteModal";
import { SingleLink } from "./SingleLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AllAddedLinks = () => {
  const { myLinks, user } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const openRemoveModal = (id) => {
    setLinkId(id);
    setIsModalOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const { data: res } = await axiosSecure.delete(`/api/links/${linkId}`);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Link removed successfully!");
        queryClient.invalidateQueries(["myLinks"]);
        setIsModalOpen(false);
        setLinkId(null);
      } else {
        toast.error(data.message || "Failed to remove link.");
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to remove link.");
      setIsLoading(false);
    },
  });
  return (
    <section className="mt-8 flex flex-col gap-5">
      {myLinks?.map((link) => (
        <SingleLink
          key={link._id}
          link={link}
          openRemoveModal={openRemoveModal}
        />
      ))}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          mutation.mutate();
          setIsLoading(true);
        }}
        isLoading={isLoading}
      />
    </section>
  );
};
