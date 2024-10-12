import PropTypes from "prop-types";
import { CiImageOn } from "react-icons/ci";

export const ProfilePicture = ({ profilePictureUrl }) => {
  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row items-center p-5 rounded-lg lg:gap-40">
      <h3 className="text-lg text-center lg:text-start text-secondary/70 max-w-[170px] text-nowrap">
        Profile picture
      </h3>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <img
          src={profilePictureUrl}
          alt=""
          className="size-[165px] rounded-lg bg-gray-200 object-cover object-top"
        />
        <div className="flex flex-col justify-center lg:block">
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary border-dashed rounded-lg mb-4 active:bg-primary/10 justify-center lg:justify-normal">
            <CiImageOn /> Change
          </button>
          <p className="text-sm text-secondary/70">
            Use PNG, JPG or BMP format
          </p>
        </div>
      </div>
    </div>
  );
};

ProfilePicture.propTypes = {
  profilePictureUrl: PropTypes.string,
};
