import PropTypes from "prop-types";
import { LuEqual } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../../provider/AppProvider";
import { useEffect, useState } from "react";

export const SingleLink = ({
  link,
  openRemoveModal,
  updateDataSeter,
  isEdit,
  isLoading,
  failedMessage,
}) => {
  const { platforms } = useAppContext();
  const [updatedLink, setUpdatedLink] = useState(link);
  useEffect(() => {
    if (!isEdit) setUpdatedLink(link);
  }, [isEdit, link]);

  const onPlatformChange = (e) => {
    const selectedPlatfrom = e.target.value;
    const findedPlatform = platforms.find(
      (platform) =>
        platform.name.replace(/\s+/g, "").toLowerCase() ===
        selectedPlatfrom.replace(/\s+/g, "").toLowerCase()
    );
    const platform = {
      name: findedPlatform ? findedPlatform.name : "Website",
      bgColor: findedPlatform
        ? findedPlatform.bgColor
        : generateRandomColor(platforms),
      icon: findedPlatform ? findedPlatform.icon : "https://example.com",
    };
    updateDataSeter({ ...updatedLink, platform });
    setUpdatedLink((prev) => ({
      ...prev,
      platform,
    }));
  };

  const onUrlChange = (e) => {
    const updatedUrl = e.target.value;
    updateDataSeter({ ...updatedLink, url: updatedUrl });
    setUpdatedLink((prev) => ({
      ...prev,
      url: updatedUrl,
    }));
  };

  const onPlatformInputChange = (e) => {
    const platformName = e.target.value;
    const findedPlatform = platforms.find(
      (platform) =>
        platform.name.replace(/\s+/g, "").toLowerCase() ===
        platformName.replace(/\s+/g, "").toLowerCase()
    );

    const platform = {
      name: findedPlatform ? findedPlatform.name : platformName,
      bgColor: findedPlatform
        ? findedPlatform.bgColor
        : generateRandomColor(platforms),
      icon: findedPlatform ? findedPlatform.icon : "https://example.com",
    };
    updateDataSeter({ ...updatedLink, platform });
    setUpdatedLink((prev) => ({
      ...prev,
      platform,
    }));
  };
  const isNotFinded = platforms.find(
    (i) => i.name == updatedLink?.platform?.name
  )
    ? false
    : true;
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-secondary font-semibold flex items-center gap-2">
          <LuEqual /> Link #{link?.order}
        </h3>
        <button
          disabled={isLoading}
          onClick={() => openRemoveModal(updatedLink._id)}
          className="text-secondary text-lg"
        >
          Remove
        </button>
      </div>
      <div className="mt-3">
        <div className="relative w-full">
          <label className="">Plartform</label>
          <select
            name=""
            id=""
            disabled={!isEdit}
            onChange={onPlatformChange}
            value={!isNotFinded ? updatedLink?.platform?.name : "Website"}
            className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1 appearance-none"
          >
            <option value="Website" disabled={isNotFinded}>
              Website
            </option>
            {platforms.map((platform) => (
              <option
                disabled={platform?.name === link?.platform?.name}
                key={platform._id}
                value={platform.name}
              >
                {platform.name}
              </option>
            ))}
          </select>
          <span className="absolute bottom-3 right-5 text-2xl text-secondary">
            <MdKeyboardArrowDown />
          </span>
        </div>
        {isNotFinded && isEdit && (
          <div className="mt-3">
            <label className="mt-4">Platform Name</label>
            <input
              type="text"
              value={updatedLink?.platform?.name}
              disabled={!isEdit}
              onChange={onPlatformInputChange}
              className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1"
              placeholder="Your platform name"
            />
          </div>
        )}
        <div className="mt-3">
          <label className="mt-4">updatedLink</label>
          <input
            type="text"
            value={updatedLink?.url}
            disabled={!isEdit}
            onChange={onUrlChange}
            className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1"
            placeholder="https://example.com"
          />
        </div>
      </div>
      {failedMessage && (
        <div className="mt-3 text-red-500 text-sm">{failedMessage}</div>
      )}
    </div>
  );
};

const generateRandomColor = (platforms) => {
  let randomColor;
  do {
    // Generate random hex color
    randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  } while (
    randomColor === "#FFFFFF" ||
    platforms.some((platform) => platform.bgColor === randomColor)
  );

  return randomColor;
};

SingleLink.propTypes = {
  link: PropTypes.object,
  openRemoveModal: PropTypes.func.isRequired,
  updateDataSeter: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  failedMessage: PropTypes.string,
};
