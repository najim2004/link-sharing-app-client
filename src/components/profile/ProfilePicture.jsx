import PropTypes from "prop-types";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";

export const ProfilePicture = ({
  profilePictureUrl,
  profilePictureUpdater,
  isUploading,
}) => {
  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row items-center p-5 rounded-lg lg:gap-40">
      <h3 className="text-lg text-center lg:text-start text-secondary/70 max-w-[170px] text-nowrap">
        Profile picture
      </h3>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="size-[165px] rounded-lg bg-gray-200 relative">
          <img
            src={profilePictureUrl}
            alt=""
            className="size-[165px] rounded-lg object-cover object-top"
          />
          {isUploading && (
            <div className="absolute top-0 left-0 inset-0 flex justify-center items-center bg-secondary/50">
              <FaSpinner className="animate-spin text-2xl" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center lg:block">
          {!isUploading && (
            <>
              <label
                htmlFor="change-photo"
                className="flex items-center gap-2 px-4 py-2 border border-primary text-primary border-dashed rounded-lg mb-4 active:bg-primary/10 justify-center lg:justify-normal w-max"
              >
                <CiImageOn /> Change
              </label>
              <input
                disabled={isUploading}
                onChange={profilePictureUpdater}
                type="file"
                className="hidden"
                id="change-photo"
              />
            </>
          )}
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
  profilePictureUpdater: PropTypes.func,
  isUploading: PropTypes.bool,
};
