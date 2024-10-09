import { CiImageOn } from "react-icons/ci";

export const ProfilePicture = () => {
  return (
    <div className="bg-gray-100 flex items-center p-5 rounded-lg gap-40">
      <h3 className="text-lg text-secondary/70 w-[170px]">Profile picture</h3>
      <div className="flex items-center gap-5">
        <img src="" alt="" className="size-[165px] rounded-lg bg-gray-200" />
        <div className="">
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary border-dashed rounded-lg mb-4 active:bg-primary/10">
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
