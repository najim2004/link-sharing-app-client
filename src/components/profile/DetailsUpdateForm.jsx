import { useState } from "react";
import { LuFileEdit } from "react-icons/lu";

export const DetailsUpdateForm = () => {
  const initialData = {
    firstName: "Mohammad",
    lastName: "Najim",
    bio: "I am a software engineer with 5 years of experience",
    email: "najim@gmail.com",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(initialData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form reset when "Cancel" is clicked
  const handleCancel = () => {
    setFormData(initialData); // Reset form to default values
    setIsEdit(false); // Exit edit mode
  };

  // Handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted with: " + JSON.stringify(formData));
    setIsEdit(false); // Optionally, exit edit mode after saving
  };

  return (
    <div className="flex mt-7 relative">
      {!isEdit && (
        <button
          onClick={() => setIsEdit(true)}
          className="absolute top-0 right-0 text-lg text-primary"
        >
          <LuFileEdit />
        </button>
      )}
      <form
        className="w-full flex flex-col gap-5 bg-gray-100 p-5 rounded-lg mt-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center gap-40">
            <label
              htmlFor="fullName"
              className="text-lg text-secondary/70 w-[170px]"
            >
              First name*
            </label>
            <input
              type="text"
              name="fullName"
              required
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex items-center gap-40">
            <label
              htmlFor="fullName"
              className="text-lg text-secondary/70 w-[170px]"
            >
              Last name*
            </label>
            <input
              type="text"
              name="fullName"
              required
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex items-center gap-40">
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
              disabled={!isEdit}
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex items-center gap-40">
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
              className="p-2.5 bg-white rounded-md outline-none focus:outline-primary outline-secondary/40 flex-grow min-h-[80px]"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {isEdit && (
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2 py-1 rounded-md bg-white text-primary border border-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-primary text-white font-semibold"
            >
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
