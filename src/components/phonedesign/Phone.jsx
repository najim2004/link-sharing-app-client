import PropTypes from "prop-types";
import { useAppContext } from "../../provider/AppProvider";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export const Phone = ({ myLinks }) => {
  const { user, myLinksLoading } = useAppContext();
  return (
    <div className="h-[680px] w-[370px] border border-secondary/60 rounded-[50px] p-4 bg-white relative">
      <div className="h-full border border-secondary/60 rounded-[40px] w-full overflow-hidden">
        <div className="w-full h-full overflow-auto  flex flex-col items-center px-6">
          <div className="absolute top-4.5 left-0 w-full">
            <div className="h-6 w-[25%] rounded-b-2xl bg-secondary mx-auto flex justify-center items-center gap-6">
              <span className="size-3 rounded-full bg-white"></span>
              <span className="size-2 rounded-full bg-white"></span>
            </div>
          </div>
          <img
            src={user?.profilePicture}
            alt=""
            className="size-[150px] bg-secondary/20 rounded-full mt-10 border-[3px] border-primary/60 object-cover object-top"
          />
          <h3 className="text-secondary text-lg font-semibold mt-4">
            {user?.firstName + " " + user?.lastName}
          </h3>
          <p className="text-secondary text-sm mt-3">{user?.email}</p>
          <p className="mt-2 text-sm text-secondary/60 text-center">
            {user?.bio || "Bio"}
          </p>
          <hr className="w-full mt-12 mb-5 border-dashed border-secondary" />
          <div className="w-full flex flex-col gap-3 pb-10">
            {myLinks?.map((link) => (
              <Link
                to={link?.url}
                target="_blank"
                key={link._id}
                className={`w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center hover:opacity-90`}
                style={{ backgroundColor: `${link?.platform.bgColor}` }}
              >
                {link?.platform.name}
              </Link>
            ))}
            {myLinksLoading && (
              <div className="w-full flex items-center justify-center text-primary">
                <FaSpinner className="animate-spin text-2xl" />
              </div>
            )}
            {myLinks?.length < 1 && (
              <button className="w-full py-3 mt-16 border border-primary rounded-lg text-primary font-semibold">
                Please add a link
              </button>
            )}
          </div>
          <div className="absolute bottom-5 left-0 w-full">
            <hr className="border-2 border-secondary w-[50%] mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

Phone.propTypes = {
  myLinks: PropTypes.array,
};
