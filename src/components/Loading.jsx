import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

export const Loading = () => {
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeout(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white z-50 flex flex-col justify-center items-center gap-3">
      <h3 className="flex items-center gap-3 text-4xl font-bold text-secondary">
        <p
          className={`bg-primary text-4xl py-1 px-1.5 transition-all ${
            isTimeout ? "translate-x-0" : "translate-x-[175%]"
          }  duration-500 rounded-xl text-white`}
        >
          <FiLink className="rotate-45" />
        </p>

        <div className="overflow-hidden w-40">
          <p
            className={`transition-all ${
              isTimeout ? "translate-x-0" : "-translate-x-full"
            }  duration-700 delay-500`}
          >
            devlinks
          </p>
        </div>
      </h3>
      <FaSpinner className="animate-spin text-2xl" />
    </div>
  );
};
