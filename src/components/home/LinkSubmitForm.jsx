import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../../provider/AppProvider";
import { FaSpinner } from "react-icons/fa";

const LinkSubmitForm = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const { platforms } = useAppContext();
  const [selectedPlatform, setSelectedPlatform] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Link</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <div className="relative w-full">
              <label>Platform</label>
              <select
                {...register("platform", { required: "Platform is required" })}
                className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1 appearance-none"
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">Select platform</option>
                <option className="text-sm font-semibold" value="Website">
                  Website
                </option>
                {platforms.map((platform) => (
                  <option
                    key={platform._id}
                    value={platform._id}
                    className="text-sm font-semibold"
                  >
                    {platform.name}
                  </option>
                ))}
              </select>
              <span className="absolute bottom-3 right-5 text-2xl text-secondary">
                <MdKeyboardArrowDown />
              </span>
              {errors.platform && (
                <span className="text-red-500 text-sm">
                  {errors.platform.message}
                </span>
              )}
            </div>
          </div>

          {selectedPlatform === "Website" && (
            <div className="mt-3">
              <label>Platform Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "platform name is required",
                })}
                className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1"
                placeholder="Your platform name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}
          <div className="mt-3">
            <label>Link</label>
            <input
              type="text"
              {...register("link", {
                required: "Link is required",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Invalid URL format",
                },
              })}
              className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1"
              placeholder="https://example.com"
            />
            {errors.link && (
              <span className="text-red-500 text-sm">
                {errors.link.message}
              </span>
            )}
          </div>

          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/80 flex justify-center items-center"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                <span className="w-max mx-auto">Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LinkSubmitForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LinkSubmitForm;
