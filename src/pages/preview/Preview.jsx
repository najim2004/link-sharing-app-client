import { useParams } from "react-router-dom";

export const Preview = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <section className="bg-white p-5 rounded-lg h-full max-w-[600px] overflow-auto mx-auto flex flex-col items-center lg:px-10">
      <div className="text-center flex flex-col items-center">
        <img
          src=""
          alt=""
          className="size-[150px] bg-secondary/20 rounded-full mt-10 border-[3px] border-primary"
        />
        <h3 className="text-secondary text-lg font-semibold mt-4">
          Mohammad Najim
        </h3>
        <p className="text-secondary text-sm mt-3">najim.developer@gmail.com</p>
        <p className="mt-2 text-sm text-secondary/60 text-center">
          Hi! I am a pesionet web developer
        </p>
      </div>
      <hr className="w-full mt-12 mb-5 border-dashed border-secondary" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <button className="w-full py-3 border border-primary rounded-lg text-primary font-semibold">
          Please add a link
        </button>
        <button className="w-full py-3 border border-primary rounded-lg text-primary font-semibold">
          Please add a link
        </button>
        <button className="w-full py-3 border border-primary rounded-lg text-primary font-semibold">
          Please add a link
        </button>
        <button className="w-full py-3 border border-primary rounded-lg text-primary font-semibold">
          Please add a link
        </button>
      </div>
    </section>
  );
};
