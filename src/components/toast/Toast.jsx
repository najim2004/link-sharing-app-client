import PropTypes from "prop-types";

export const Toast = ({ message, onClose, className, bClassName }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded-lg shadow-md ${className}`}
    >
      {message}
      <button
        onClick={onClose}
        className={`ml-4 text-gray-300 hover:text-white ${bClassName}`}
      >
        &times;
      </button>
    </div>
  );
};
Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  bClassName: PropTypes.string,
};
