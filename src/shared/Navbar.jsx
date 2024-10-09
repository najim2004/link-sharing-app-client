import { FaRegUserCircle } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const navList = (
    <>
      <li>
        <NavLink
          to={"/"}
          className="flex items-center gap-2 py-2.5
         px-6 rounded-lg"
        >
          <FiLink />
          <span className="hidden lg:flex">Links</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/profile/123"}
          className="flex items-center gap-2 py-2.5
         px-6 rounded-lg"
        >
          <FaRegUserCircle />
          <span className="hidden lg:flex">Profile Details</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="flex justify-between items-center bg-white py-4 px-6 rounded-lg mb-6">
      <div className="">
        <h3 className="flex items-center gap-3 text-3xl font-bold text-secondary">
          <span
            className="bg-primary text-2xl py-1 px-1.5
           rounded-xl text-white"
          >
            <FiLink className=" rotate-45" />
          </span>
          <span className="hidden lg:flex">devlinks</span>
        </h3>
      </div>
      <div className="">
        <ul className="flex gap-8 text-xl font-semibold text-secondary navlist">
          {navList}
        </ul>
      </div>
      <button
        className="py-2.5
         px-6 rounded-lg border border-primary text-primary text-xl font-semibold"
      >
        <span className="hidden lg:flex">Preview</span>
        <IoEyeOutline className="flex lg:hidden" />
      </button>
    </div>
  );
};
