import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

const getChangedProperties = (originalObj, updatedObj) =>
  Object.entries(updatedObj).reduce((changes, [key, value]) => {
    if (originalObj[key] !== value) {
      changes[key] = value; // Capture the updated value
    }
    return changes;
  }, {});

export const DetailsUpdateForm = ({
  userDetails,
  isEdit,
  setIsEdit,
  handleUpdate,
  isLoading,
}) => {
  const [formData, setFormData] = useState(userDetails);

  // Update formData when userDetails changes
  useEffect(() => {
    setFormData(userDetails);
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails === formData) return toast.error("No changes were made!");
    const changedProperties = getChangedProperties(userDetails, formData);
    handleUpdate(changedProperties);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData(userDetails);
  };

  return (
    <div className="flex mt-7 relative">
      {!isEdit && (
        <button
          onClick={() => setIsEdit(true)}
          className="absolute top-0 right-0 text-2xl text-primary"
        >
          <BsThreeDots />
        </button>
      )}
      <form
        className="w-full flex flex-col gap-5 bg-gray-100 p-5 rounded-lg mt-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:gap-40">
            <label
              htmlFor="firstName"
              className="text-lg text-secondary/70 w-[170px]"
            >
              First name{isEdit && <span>*</span>}
            </label>
            <input
              type="text"
              name="firstName"
              required
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow w-full"
              value={formData.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:gap-40">
            <label
              htmlFor="lastName"
              className="text-lg text-secondary/70 w-[170px]"
            >
              Last name{isEdit && <span>*</span>}
            </label>
            <input
              type="text"
              name="lastName"
              required
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow w-full"
              value={formData.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:gap-40">
            <label
              htmlFor="email"
              className="text-lg text-secondary/70 w-[170px]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              disabled
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow w-full"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:gap-40">
            <label
              htmlFor="bio"
              className="text-lg text-secondary/70 w-[170px]"
            >
              Short Bio
            </label>
            <textarea
              name="bio"
              maxLength={100}
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow min-h-[80px] w-full"
              value={formData.bio || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {isEdit && (
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleCancel}
              className="px-2 py-1 rounded-md bg-white text-primary border border-primary"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="px-2 py-1 rounded-md bg-primary text-white font-semibold"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

DetailsUpdateForm.propTypes = {
  userDetails: PropTypes.object,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  handleUpdate: PropTypes.func,
  isLoading: PropTypes.bool,
};
