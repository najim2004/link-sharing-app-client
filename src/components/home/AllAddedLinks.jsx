import { useState, useCallback } from "react";
import DeleteModal from "./deleteModal";
import { SingleLink } from "./SingleLink";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
import {
  useDeleteUserLinkMutation,
  useGetUserLinksQuery,
  useUpdateUserLinkMutation,
} from "../../redux/api/linksApiSlice";

export const AllAddedLinks = () => {
  const { data: myLinks, isLoading: myLinksLoading } = useGetUserLinksQuery();
  const [onDelete] = useDeleteUserLinkMutation();
  const [updateLinks] = useUpdateUserLinkMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [updatableData, setUpdatableData] = useState([]);
  const [updateFailedIds, setUpdateFailedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, linkId: null });

  const openRemoveModal = useCallback((id) => {
    setModalState({ isOpen: true, linkId: id });
  }, []);

  const updateDataSeter = useCallback((obj) => {
    setUpdatableData((prev) => {
      const existingIndex = prev.findIndex((link) => link._id === obj._id);
      const newLink = { _id: obj._id, url: obj.url, platform: obj.platform };

      if (existingIndex === -1) {
        return [...prev, newLink];
      }

      const updated = [...prev];
      updated[existingIndex] = newLink;
      return updated;
    });
  }, []);

  const handleUpdateCancel = useCallback(() => {
    setUpdatableData([]);
    setIsEdit(false);
    setUpdateFailedIds([]);
  }, []);

  const onUpdateConfirmed = async () => {
    if (updatableData.length === 0) {
      return toast.error("No changes were made");
    }

    setIsLoading(true);
    try {
      const result = await updateLinks(updatableData).unwrap();
      if (result.success) {
        toast.success("Links updated successfully!");
        handleUpdateCancel();
      } else {
        toast.error(result.message || "Failed to update links");
        if (result?.failedIds?.length > 0) {
          setUpdateFailedIds(result.failedIds);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update links");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await onDelete(modalState.linkId).unwrap();
      if (result.success) {
        toast.success("Link removed successfully!");
        setModalState({ isOpen: false, linkId: null });
      } else {
        toast.error(result.message || "Failed to remove link");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Failed to remove link");
    }
  };

  const renderLoading = () => (
    <div className="w-full flex items-center justify-center text-primary">
      <FaSpinner className="animate-spin text-2xl" />
    </div>
  );

  const renderEmpty = () => (
    <div className="w-full flex justify-center items-center my-40">
      <h3 className="text-2xl font-semibold text-red-500 text-center leading-[40px]">
        Empty!
      </h3>
    </div>
  );

  return (
    <section className={`mt-8 flex flex-col gap-5 ${isEdit ? "mb-16" : ""}`}>
      {!isEdit && myLinks?.length > 0 && (
        <button
          onClick={() => setIsEdit(true)}
          className="flex items-center gap-2 py-2 lg:py-2.5 px-3 lg:px-6 rounded-lg border border-primary text-primary w-max ml-auto mr-1"
        >
          <MdModeEdit /> <span className="hidden lg:flex">Edit</span>
        </button>
      )}

      {myLinksLoading && renderLoading()}

      {myLinks?.map((link) => (
        <SingleLink
          key={link._id}
          isEdit={isEdit}
          isLoading={isLoading}
          link={link}
          openRemoveModal={openRemoveModal}
          updateDataSeter={updateDataSeter}
          failedMessage={
            updateFailedIds.includes(link._id) ? "Failed to update this!" : ""
          }
        />
      ))}

      {myLinks?.length <= 0 && renderEmpty()}

      <DeleteModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, linkId: null })}
        onConfirm={handleDelete}
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
          className="flex items-center gap-2 py-2 lg:py-2.5 px-3 lg:px-5 rounded-lg border border-primary text-primary w-max h-max"
        >
          <ImCancelCircle /> <span className="hidden lg:flex">Cancel</span>
        </button>
        <button
          disabled={isLoading}
          onClick={onUpdateConfirmed}
          className="flex items-center justify-center gap-2 py-2 lg:py-2.5 px-3 lg:px-5 rounded-lg border bg-primary text-white w-max h-max"
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
