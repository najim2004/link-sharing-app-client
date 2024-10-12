import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-md shadow-lg">
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="mt-2">Do you really want to remove this link?</p>
        <div className="mt-4 flex justify-end">
          <button
            disabled={isLoading}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center items-center"
            onClick={onConfirm}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              <span className="w-max mx-auto">Remove</span>
            )}
          </button>
          <button
            disabled={isLoading}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
