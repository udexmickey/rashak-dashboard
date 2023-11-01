"use client";
import { useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Import your Sidebar component
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import Image from "next/image";

const TopNav: React.FC<{ pageName: string }> = ({ pageName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      <header className="h-[10vh] flex justify-between items-center p-4 bg-white text-[#1E1E1E] border-b border-gray-300">
        <div className="lg:hidden">
          <FaBars
            size={24}
            className="text-[#1E1E1E] cursor-pointer"
            onClick={handleToggleSidebar}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="lg:w-64 max-h-max">
            <Link href="/" as={'/'} className="-m-1.5 p-1.5 max-w-max max-h-12">
                <span className="sr-only">Rashak logo</span>
                <Image
                    src={'/rashak-logo-svg.svg'}
                    loading='eager'
                    priority={true}
                    className='max-w-max w-full h-7 md:h-9' 
                    alt={'Rashak logo'}
                    quality={100}
                    sizes="max-w-max"
                    width={108}
                    height={28}
                    aria-hidden="true"
                />
            </Link>
          </div>
          <h1 className="text-2xl md:px-8 px-4 font-bold md:flex hidden">{pageName}</h1>
        </div>
        <div className="flex">
          <Link href='notification'>
            <FaBell size={24} className="text-[#ED7524]" />
          </Link>
        </div>
      </header>
      <Drawer
        open={isSidebarOpen}
        onClose={handleToggleSidebar}
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Sidebar handleCloseSidebar={handleCloseSidebar}/>
      </Drawer>
    </div>
  );
};

export default TopNav;
