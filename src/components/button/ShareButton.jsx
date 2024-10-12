import { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { BsFacebook, BsTwitter, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useAppContext } from "../../provider/AppProvider";
import { useLocation } from "react-router-dom";

const ShareButton = () => {
  const [sharedSuccessfully, setSharedSuccessfully] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppContext();
  const location = useLocation();
  const isVercel = location.pathname.includes("vercel.app");
  const isFirebase = location.pathname.includes("web.app");
  const urlToShare = user?._id
    ? isFirebase
      ? `http://devlinks24.web.app/profile/${user._id}`
      : isVercel
      ? `http://devlinks24.vercel.app/profile/${user._id}`
      : `http://localhost:5173/profile/${user._id}`
    : window.location.href;
  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`,
    twitter: `https://twitter.com/intent/tweet?text=Check this out!&url=${urlToShare}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`,
    whatsapp: `https://api.whatsapp.com/send?text=Check this out! ${urlToShare}`,
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(urlToShare);
      triggerSuccess();
      setShowModal(true);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy the link to clipboard.");
    }
  };

  const triggerSuccess = () => {
    setSharedSuccessfully(true);

    setTimeout(() => {
      setSharedSuccessfully(false);
    }, 3000);
  };

  const openSocialShare = (platformUrl) => {
    window.open(platformUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={handleShare}
        className="py-2 lg:py-2.5 px-3 lg:px-6 rounded-lg text-white text-base lg:text-xl font-semibold flex items-center gap-2 bg-primary transition-all duration-300 ease-in-out"
      >
        <span
          className={`inline-block transition-transform duration-500 ease-in-out ${
            sharedSuccessfully ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <BsFillShareFill />
        </span>
        <span
          className={`absolute inline-block transition-transform duration-500 ease-in-out ${
            sharedSuccessfully ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <FaCheck />
        </span>
        <span className="hidden lg:flex">
          {sharedSuccessfully ? "Copied!" : "Share"}
        </span>
      </button>
      {/* Modal for Social Media Sharing */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-6 mx-auto text-center">
              Link copied! Also share via
            </h3>
            <div className="flex justify-between sm:justify-around gap-2 sm:gap-4">
              {/* Facebook */}
              <button
                onClick={() => openSocialShare(socialMediaLinks.facebook)}
                className="text-blue-600"
                title="Share on Facebook"
              >
                <BsFacebook
                  size={24}
                  className="sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </button>

              {/* Twitter */}
              <button
                onClick={() => openSocialShare(socialMediaLinks.twitter)}
                className="text-blue-400"
                title="Share on Twitter"
              >
                <BsTwitter
                  size={24}
                  className="sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => openSocialShare(socialMediaLinks.linkedin)}
                className="text-blue-700"
                title="Share on LinkedIn"
              >
                <BsLinkedin
                  size={24}
                  className="sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => openSocialShare(socialMediaLinks.whatsapp)}
                className="text-green-500"
                title="Share on WhatsApp"
              >
                <BsWhatsapp
                  size={24}
                  className="sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </button>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300 ease-in-out hover:bg-red-600"
              >
                <MdClose className="block md:hidden" />
                <span className="hidden md:inline">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
