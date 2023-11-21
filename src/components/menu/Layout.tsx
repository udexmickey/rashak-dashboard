// components/Layout.tsx
'use client'
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";
import TopNav from "./TopNav";
import { useEffect } from "react";

interface LayoutProps {
  pageName: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, children }) => {
  useEffect(() => {
    if (window.innerWidth <= 768) {
      
    }
  }, [])
  
  return (
    <div className="flex flex-col">
      <TopNav pageName={pageName} />
      <div className="flex-col md:flex-row flex overflow-y-auto h-[90vh]">
        <aside className="hidden md:flex">
          <Sidebar />
        </aside>
        <main className="flex flex-col mt-8 overflow-y-auto pb-4 md:pl-12 px-6 w-full h-[84vh] max-w-[83rem] md:pr-8 gap-y-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
