import { useState } from "react";
import { AddLink } from "../../components/home/AddLink";
import { AllAddedLinks } from "../../components/home/AllAddedLinks";
import LinkSubmitForm from "../../components/home/LinkSubmitForm";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useGetPlatformsQuery } from "../../redux/api/platformsApiSlice";
import { useAddUserLinkMutation } from "../../redux/api/linksApiSlice";

const generateRandomColor = (platforms) => {
  let randomColor;
  do {
    randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  } while (
    randomColor === "#FFFFFF" ||
    platforms.some((platform) => platform.bgColor === randomColor)
  );

  return randomColor;
};

const platformDataFinder = (platforms, name) => {
  const findedObject = platforms.find(
    (platform) =>
      platform.name.replace(/\s+/g, "").toLowerCase() ===
      name.replace(/\s+/g, "").toLowerCase()
  );
  return {
    name: findedObject?.name,
    bgColor: findedObject?.bgColor,
    icon: findedObject?.icon,
  };
};

export const Home = () => {
  const { data: platforms } = useGetPlatformsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };

  const [createNewLink, { isLoading }] = useAddUserLinkMutation();

  const onSubmit = async (data) => {
    try {
      let platform = {};
      const findedPlatform = platformDataFinder(
        platforms,
        data.name
          ? data.platform == "Website"
            ? data.name
            : data.platform
          : data.platform
      );
      findedPlatform.bgColor
        ? (platform = { ...findedPlatform })
        : (platform = {
            name: data.name ? data.name : data.platform,
            bgColor: generateRandomColor(platforms),
          });
      const mutatedData = { platform, url: data?.link };
      const { data: res } = await createNewLink(mutatedData);
      if (res?.success) {
        toast.success("Link added successfully!");
        onClose();
      } else {
        throw new Error(res?.message || "Failed to add link.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add link.");
    }
  };

  return (
    <div className="bg-white py-4 pl-6 rounded-lg overflow-hidden relative">
      <Helmet>
        <title>Home || Dev Links 24</title>
      </Helmet>
      <div className="max-h-full overflow-auto pr-6">
        <section className="mt-3.5">
          <h2 className="text-3xl font-bold text-secondary mb-3.5">
            Customize your links
          </h2>
          <p className="text-secondary">
            Add/edit/remove links below and then share all your profile with the
            world.
          </p>
        </section>
        <AddLink setIsModalOpen={setIsModalOpen} />
        <AllAddedLinks />
        <LinkSubmitForm
          isOpen={isModalOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
