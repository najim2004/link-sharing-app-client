import PropTypes from "prop-types";

export const AddLink = ({ setIsModalOpen }) => {
  return (
    <section className="mt-14">
      <button
        onClick={() => setIsModalOpen(true)}
        className="py-3 w-full border border-primary rounded-lg text-primary text-lg font-semibold"
      >
        + Add new link
      </button>
    </section>
  );
};

AddLink.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
