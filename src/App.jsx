import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { PhonePreview } from "./components/PhonePreview";
import { PreviewNav } from "./components/preview/PreviewNav";

export const App = () => {
  const location = useLocation();
  const isPreview = location?.pathname?.includes("/preview");
  return (
    <div className="bg-gray-100 p-6">
      {isPreview ? <PreviewNav /> : <Navbar />}
      <div className="flex gap-6 w-full *:flex-1 h-full lg:h-[calc(100vh-154px)]">
        {!isPreview && <PhonePreview />}
        <Outlet />
      </div>
    </div>
  );
};
