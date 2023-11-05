// components/Layout.tsx

import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";
import TopNav from "./TopNav";

interface LayoutProps {
  pageName: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, children }) => {
  return (
    <div className="flex flex-col">
      <TopNav pageName={pageName} />
      <div className="flex-col md:flex-row flex overflow-y-auto h-[90vh]">
        <aside className="border-r border-gray-300 hidden md:flex">
          <Sidebar />
        </aside>
        <div className="flex-1 flex flex-col overflow-y-auto h-[90vh] py-4 md:px-8 px-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
