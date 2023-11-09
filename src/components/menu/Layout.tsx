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
        <aside className="hidden md:flex">
          <Sidebar />
        </aside>
        <div className="flex flex-col max-w-[83rem] overflow-y-auto h-[90vh] pb-4 md:pl-12 px-6 w-full md:pr-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
