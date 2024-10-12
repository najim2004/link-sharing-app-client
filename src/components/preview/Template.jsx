import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const Template = ({ myLinks, user }) => {
  return (
    <>
      {user ? (
        <section className="bg-white p-5 rounded-lg h-full max-w-[600px] overflow-auto mx-auto flex flex-col items-center lg:px-10">
          <div className="text-center flex flex-col items-center">
            <img
              src={user?.profilePicture}
              alt=""
              className="size-[150px] md:size-[200px] bg-secondary/20 rounded-full mt-10 border-[3px] border-primary/60 object-cover object-top"
            />
            <h3 className="text-secondary text-lg font-semibold mt-4">
              {user?.firstName + " " + user?.lastName}
            </h3>
            <p className="text-secondary text-sm mt-3">{user?.email}</p>
            <p className="mt-2 text-sm text-secondary/60 text-center">
              {user?.bio || "Bio"}
            </p>
          </div>
          <hr className="w-full mt-12 mb-5 border-dashed border-secondary" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
          {myLinks?.length < 1 && (
            <h3 className="w-full flex flex-col justify-center items-center mt-16 text-2xl text-center text-primary font-semibold">
              404 <br />
              No Links Found!
            </h3>
          )}
        </section>
      ) : (
        <div className="h-full max-w-[600px] mx-auto bg-white rounded-lg flex justify-center items-center">
          <h3 className="text-4xl font-semibold text-center leading-[50px] text-red-500">
            Something went <br /> wrong! :(
          </h3>
        </div>
      )}
    </>
  );
};

Template.propTypes = {
  myLinks: PropTypes.array,
  user: PropTypes.object,
};
