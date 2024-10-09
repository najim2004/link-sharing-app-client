export const PhonePreview = () => {
  return (
    <section className="bg-white py-4 px-6 rounded-lg flex flex-col justify-center items-center">
      <h3 className="mb-2 text-secondary font-semibold">Phone Preview</h3>
      <div className="h-[680px] w-[370px] border border-secondary/60 rounded-[50px] p-4">
        <div className="h-full overflow-auto border border-secondary/60 rounded-[40px] flex flex-col items-center w-full px-6 relative">
          <img
            src=""
            alt=""
            className="size-[150px] bg-secondary/20 rounded-full mt-10 border-[3px] border-primary"
          />
          <h3 className="text-secondary text-lg font-semibold mt-4">
            Mohammad Najim
          </h3>
          <p className="text-secondary text-sm mt-3">
            najim.developer@gmail.com
          </p>
          <p className="mt-2 text-sm text-secondary/60 text-center">
            Hi! I am a pesionet web developer
          </p>
          <hr className="w-full mt-12 mb-5 border-dashed border-secondary" />
          <div className="w-full">
            <button className="w-full py-3 mt-16 border border-primary rounded-lg text-primary font-semibold">
              Please add a link
            </button>
          </div>
          <div className="absolute bottom-1.5 left-0 w-full">
            <hr className="border-2 border-secondary w-[60%] mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
