"use client";
import useAuthRedirect from "@/hooks/authentication/UseIsLoggedIn";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { useEffect } from "react";

interface LayoutProps {
  pageName: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, children }) => {
  const { checkAuthAndRedirect } = useAuthRedirect();

  useEffect(() => {
    checkAuthAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <>
        <TopNav pageName={pageName} />
        <div className="flex-col md:flex-row flex overflow-y-none h-[90vh]">
          <aside className="hidden md:flex">
            <Sidebar />
          </aside>
          <main className="flex flex-col overflow-y-auto py-4 md:pl-12 px-6 w-full h-[89vh] max-w-[83rem] md:pr-8 gap-y-4">
            {children}
          </main>
        </div>
      </>
    </div>
  );
};

export default Layout;
