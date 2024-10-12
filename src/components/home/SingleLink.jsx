import PropTypes from "prop-types";
import { LuEqual } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../../provider/AppProvider";

export const SingleLink = ({ link, openRemoveModal }) => {
  const { platforms } = useAppContext();
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-secondary font-semibold flex items-center gap-2">
          <LuEqual /> Link #{link?.order}
        </h3>
        <button
          onClick={() => openRemoveModal(link._id)}
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
            className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1 appearance-none"
          >
            {platforms.map((platform) => (
              <option
                key={platform._id}
                selected={platform?.name === link?.platform?.name}
                value={platform._id}
              >
                {platform.name}
              </option>
            ))}
          </select>
          <span className="absolute bottom-3 right-5 text-2xl text-secondary">
            <MdKeyboardArrowDown />
          </span>
        </div>
        <div className="mt-3">
          <label className="mt-4">Link</label>
          <input
            type="text"
            defaultValue={link?.url}
            className="w-full py-3 border border-gray-400 rounded-lg text-secondary px-5 outline-none bg-white mt-1"
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
};

SingleLink.propTypes = {
  link: PropTypes.object.isRequired,
  openRemoveModal: PropTypes.func.isRequired,
};
