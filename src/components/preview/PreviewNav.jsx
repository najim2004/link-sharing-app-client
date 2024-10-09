import { BsFillShareFill } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";

export const PreviewNav = () => {
  return (
    <nav className="flex justify-between items-center bg-white py-4 px-6 rounded-lg mb-6">
      <button
        className="py-2.5
         px-6 rounded-lg border border-primary text-primary text-xl font-semibold"
      >
        <Link className="flex items-center gap-2" to={-1}>
          <MdOutlineArrowBackIosNew />
          <span className="hidden lg:flex">Back to Editor</span>
        </Link>
      </button>
      <button
        className="py-2.5
         px-6 rounded-lg text-white text-xl font-semibold flex items-center gap-2 bg-primary"
      >
        <BsFillShareFill />
        <span className="hidden lg:flex">Share</span>
      </button>
    </nav>
  );
};
