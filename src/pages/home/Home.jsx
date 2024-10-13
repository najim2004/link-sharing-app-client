import { useState } from "react";
import { AddLink } from "../../components/home/AddLink";
import { AllAddedLinks } from "../../components/home/AllAddedLinks";
import LinkSubmitForm from "../../components/home/LinkSubmitForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppContext } from "../../provider/AppProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const generateRandomColor = (platforms) => {
  let randomColor;
  do {
    // Generate random hex color
    randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  } while (
    randomColor === "#FFFFFF" ||
    platforms.some((platform) => platform.bgColor === randomColor)
  );

  return randomColor;
};

const platformDataFinder = (platforms, id) => {
  const findedObject = platforms.find((platform) => platform._id === id);
  return {
    name: findedObject?.name,
    bgColor: findedObject?.bgColor,
    icon: findedObject?.icon,
  };
};

export const Home = () => {
  const { platforms } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const onClose = () => {
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosSecure.post(`/api/links`, data);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Link added successfully!");
        queryClient.refetchQueries(["myLinks"]);
        onClose();
      } else {
        toast.error(data.message || "Failed to add link.");
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to add link.");
      setIsLoading(false);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    let platform = {};
    const findedPlatform = platformDataFinder(platforms, data?.platform);
    findedPlatform.bgColor
      ? (platform = { ...findedPlatform })
      : (platform = {
          name: data.name ? data.name : data.platform,
          bgColor: generateRandomColor(platforms),
        });
    const mutatedData = { platform, url: data?.link };
    mutation.mutate(mutatedData);
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
