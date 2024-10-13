import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { PhonePreview } from "./components/phonedesign/PhonePreview";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./provider/AppProvider";
import useAxiosPublic from "./hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAxiosSecure from "./hooks/useAxiosSecure";

const FetchPlatforms = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const response = await axiosPublic.get("/api/platforms");
      return response.data?.platforms;
    },
    initialData: [],
    refetchInterval: 600 * 1000,
  });
  return { data, isLoading, isError, error };
};

const FetchMyLinks = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["myLinks", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/links/${id}`);
      return response.data?.links;
    },
    initialData: [],
    refetchInterval: 600 * 1000,
  });
  return { myLinks: data, isLoading, isError, error, refetch };
};

export const App = () => {
  const { setPlatforms, setLoading, user, setMyLinks, setMyLinksLoading } =
    useAppContext();
  const location = useLocation();
  const isPreview = location?.pathname?.includes("/preview");
  const isAuth =
    location?.pathname?.includes("/signin") ||
    location?.pathname?.includes("/signup");

  const platformsData = FetchPlatforms();
  const links = FetchMyLinks(user?._id);
  useEffect(() => {
    if (platformsData.data) {
      setPlatforms(platformsData.data);
    }
    setLoading(platformsData.isLoading);
  }, [platformsData, setPlatforms, setLoading]);

  useEffect(() => {
    if (links?.myLinks) {
      setMyLinks(links?.myLinks);
    }
    setMyLinksLoading(links?.isLoading);
  }, [links, setMyLinksLoading, setMyLinks]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="flex gap-6 w-full *:flex-1 min-h-[calc(100vh-154px)] h-full lg:h-[calc(100vh-154px)]">
        {!isPreview && !isAuth && user && <PhonePreview />}
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};
