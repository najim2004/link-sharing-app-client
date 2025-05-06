import { Outlet, useLocation, useParams } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { PhonePreview } from "./components/phonedesign/PhonePreview";
import { Toaster } from "react-hot-toast";
import { useGetUserDataQuery } from "./redux/api/usersApiSlice";
import { useSelector } from "react-redux";

export const App = () => {
  const { user } = useSelector((state) => state.user);
  useGetUserDataQuery(undefined, {
    skip: !!user,
  });
  const location = useLocation();
  const params = useParams();
  const isPreview = location?.pathname?.includes("/preview");
  const isAuth =
    location?.pathname?.includes("/signin") ||
    location?.pathname?.includes("/signup");
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="flex gap-6 w-full *:flex-1 min-h-[calc(100vh-154px)] h-full lg:h-[calc(100vh-154px)]">
        {!isPreview &&
          !isAuth &&
          user &&
          (user._id == params?.id || !params?.id) && <PhonePreview />}
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};
