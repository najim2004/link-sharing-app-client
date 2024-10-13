import { useState } from "react";
import { useAppContext } from "../../provider/AppProvider";
import DeleteModal from "./deleteModal";
import { SingleLink } from "./SingleLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdModeEdit } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";

export const AllAddedLinks = () => {
  const { myLinks } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [updatableData, setUpdatableData] = useState([]);
  const [updateFailedIds, setUpdateFailedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const openRemoveModal = (id) => {
    setLinkId(id);
    setIsModalOpen(true);
  };

  const deleteMutation = useMutation({
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
  const updateMutation = useMutation({
    mutationFn: async () => {
      const { data: res } = await axiosSecure.patch(
        `/api/links`,
        updatableData
      );
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Link updated successfully!");
        queryClient.invalidateQueries(["myLinks"]);
        setUpdatableData([]);
        setIsEdit(false);
      } else {
        toast.error(data.message || "Failed to update link.");
        if (data?.failedIds?.length > 0) {
          queryClient.invalidateQueries(["myLinks"]);
          setUpdatableData([]);
          setUpdateFailedIds(data.failedIds);
        }
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to update link.");
      setIsLoading(false);
    },
  });

  const updateDataSeter = (obj) => {
    let found = 0;
    const updatedLinks = updatableData.map((link) => {
      if (link._id == obj._id) {
        found++;
        return { _id: obj._id, url: obj.url, platform: obj.platform };
      }

      return link;
    });
    found == 0
      ? setUpdatableData([
          ...updatedLinks,
          { _id: obj._id, url: obj.url, platform: obj.platform },
        ])
      : setUpdatableData(updatedLinks);
  };

  const handleUpdateCancel = () => {
    setUpdatableData([]);
    setIsEdit(false);
    setUpdateFailedIds([]);
  };

  const onUpdateConfirmed = () => {
    updateMutation.mutate();
    setIsLoading(true);
  };

  return (
    <section className={`mt-8 flex flex-col gap-5 ${isEdit ? "mb-16" : ""}`}>
      {!isEdit && (
        <button
          onClick={() => {
            setIsEdit(true);
          }}
          className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary text-primary w-max ml-auto mr-1"
        >
          <MdModeEdit /> <span className="hidden lg:flex">Edit</span>
        </button>
      )}

      {myLinks?.map((link) => (
        <SingleLink
          key={link._id}
          isEdit={isEdit}
          isLoading={isLoading}
          link={link}
          openRemoveModal={openRemoveModal}
          updateDataSeter={updateDataSeter}
          failedMessage={
            updateFailedIds.includes(link?._id) ? "Failed to update this!" : ""
          }
        />
      ))}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          deleteMutation.mutate();
          setIsLoading(true);
        }}
        isLoading={isLoading}
      />
      <div
        className={`transition-all ${
          isEdit ? "translate-y-0" : "translate-y-[100%]"
        } fixed lg:absolute bottom-0 right-0 h-16 border-t border-primary w-full bg-white flex gap-4 justify-end items-center px-6 rounded-t-xl`}
      >
        <button
          disabled={isLoading}
          onClick={handleUpdateCancel}
          className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-5 rounded-lg border border-primary text-primary w-max h-max"
        >
          <ImCancelCircle /> <span className="hidden lg:flex">Cancel</span>
        </button>
        <button
          disabled={isLoading}
          onClick={onUpdateConfirmed}
          className="flex items-center justify-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-5 rounded-lg border bg-primary text-white w-max h-max"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin text-2xl" />
          ) : (
            <>
              <IoSaveOutline /> <span className="hidden lg:flex">Save</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
