import { FiLink } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../provider/AppProvider";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { LiaUserEditSolid, LiaUserSolid } from "react-icons/lia";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BsFillShareFill } from "react-icons/bs";
import ShareButton from "../components/button/ShareButton";

export const Navbar = () => {
  const { user, isUserLoading, logout } = useAppContext();
  const location = useLocation();
  const isPreview = location.pathname.includes("/preview");
  const isProfile = location.pathname.includes("/profile");
  const isAuth =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  const navList = (
    <>
      <li>
        {user ? (
          <NavLink
            to={"/"}
            className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary"
          >
            <FiLink />
            <span className="hidden lg:flex">Links</span>
          </NavLink>
        ) : (
          <NavLink
            to={"/login"}
            className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary"
          >
            <IoMdLogIn />
            <span className="hidden lg:flex">Login</span>
          </NavLink>
        )}
      </li>
      <li>
        {user ? (
          <NavLink
            to={`/profile/${user._id}`}
            className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary"
          >
            <LiaUserSolid />
            <span className="hidden lg:flex">Profile Details</span>
          </NavLink>
        ) : (
          <NavLink
            to={"/signup"}
            className="flex items-center gap-2 py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary"
          >
            <LiaUserEditSolid />
            <span className="hidden lg:flex">SignUp</span>
          </NavLink>
        )}
      </li>
    </>
  );
  return (
    <nav className="flex justify-between items-center bg-white py-4 px-6 rounded-lg mb-6 z-50">
      <div className="">
        <Link
          to="/"
          className="flex items-center gap-3 text-3xl font-bold text-secondary"
        >
          <span
            className="bg-primary text-2xl py-1 px-1.5
           rounded-xl text-white"
          >
            <FiLink className=" rotate-45" />
          </span>
          <span className="hidden md:flex">devlinks</span>
        </Link>
      </div>
      {!isPreview && (
        <div className="">
          <ul className="flex gap-4 md:gap-6 lg:gap-8 text-base lg:text-xl font-semibold text-secondary navlist">
            {navList}
          </ul>
        </div>
      )}

      {!isAuth && (
        <div className="">
          {user && !isPreview && (
            <div className="flex items-center gap-4">
              <button
                className="py-2 lg:py-2.5
         px-3 lg:px-6  rounded-lg border border-primary text-primary text-base lg:text-xl font-semibold"
              >
                <Link to={"/preview"} className="flex items-center gap-2">
                  <IoEyeOutline className="flex" />
                  <span className="hidden lg:flex">Preview</span>
                </Link>
              </button>
              <button
                onClick={() => {
                  logout();
                }}
                className="py-2 lg:py-2.5
         px-2.5 rounded-lg border border-red-500 text-red-500 text-lg font-semibold flex items-center gap-2"
              >
                <IoMdLogOut /> <span className="hidden lg:flex">LogOut</span>
              </button>
            </div>
          )}
          {(isPreview || isProfile) && (
            <div className="flex items-center gap-4 md:gap-7 lg:gap-10">
              {isPreview && (
                <button
                  className="py-2 lg:py-2.5
         px-3 lg:px-6 rounded-lg border border-primary text-primary text-base lg:text-xl font-semibold"
                >
                  <Link className="flex items-center gap-2" to={-1}>
                    <MdOutlineArrowBackIosNew />
                    <span className="hidden lg:flex">Back to Editor</span>
                  </Link>
                </button>
              )}
              {(isPreview || !user) && <ShareButton />}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
