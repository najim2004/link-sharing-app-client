import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { PhonePreview } from "./components/PhonePreview";

export const App = () => {
  return (
    <div className="bg-gray-100 p-6">
      <Navbar />
      <div className="flex gap-6 w-full *:flex-1 lg:h-[calc(100vh-154px)]">
        <PhonePreview />
        <Outlet />
      </div>
    </div>
  );
};
