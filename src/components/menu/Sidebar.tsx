"use client";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";
import { FaHome, FaCog, FaFile, FaSignOutAlt, } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface SidebarItemProps {
  icon: IconType;
  text: string;
  href: string;
  isActive: boolean;
  handleCloseSidebar: () => void;
}

interface SidebarProps {
  handleCloseSidebar?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  text,
  href,
  isActive,
  handleCloseSidebar,
}) => {
  const handleClick = () => {
    if (window.innerWidth <= 768) {
      handleCloseSidebar();
    }
  };

  return (
    <Link href={href}>
      <ListItem
        button
        onClick={handleClick}
        className={`flex items-center p-4 rounded-lg dark:hover:bg-opacity-25 group hover:w-[90%] ${
          isActive ? "bg-[#ECFFF5]" : ""
        } transition-all duration-200 ease-in-out`}
      >
        <ListItemIcon>
          <Icon
            size={46}
            className={`flex-shrink-0 w-7 h-7 transition duration-75 ${
              isActive ? "text-[#00A651]" : "text-[#484848]"
            } group-hover:text-[#00A651]`}
            aria-hidden="true"
          />
        </ListItemIcon>
        <ListItemText
          primary={text}
          className={`text-sm whitespace-nowrap ${
            isActive ? "text-[#00A651]" : "text-[#484848]"
          }`}
        />
      </ListItem>
    </Link>
  );
};

const sidebarItems = [
  { icon: FaHome, text: "Dashboard", href: "/dashboard" },
  { icon: FaCog, text: "Settings", href: "/settings" },
  { icon: FaUserGroup, text: "User Management", href: "/user-management" },
  { icon: FaFile, text: "File Management", href: "/file-management" },
];

const Sidebar: React.FC<SidebarProps> = ({ handleCloseSidebar }) => {
  let router = usePathname();

  return (
    <aside className="h-[90vh] w-80 flex flex-col items-center justify-start pl-8 bg-white" aria-label="Sidebar">
      <div className="w-64 h-[10vh] sm:hidden flex px-8 items-center border-b border-gray-300">
        <Link href="/" as={"/"} className="-m-1.5 p-1.5 max-w-max max-h-12">
          <span className="sr-only">Rashak logo</span>
          <Image
            src={"/rashak-logo-svg.svg"}
            loading="eager"
            priority={true}
            className="max-w-max w-full h-7 md:h-9"
            alt={"Rashak logo"}
            quality={100}
            sizes="max-w-max"
            width={108}
            height={28}
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="h-[90%] relative py-4 overflow-y-auto w-full bg-white">
        <List className="space-y-4 font-medium relative">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              href={item.href}
              isActive={router === item.href}
              handleCloseSidebar={handleCloseSidebar as () => void}
            />
          ))}
          <Link href={"/login"}>
            <ListItem className="fixed bottom-32 z-10 max-w-max">
              <div className="bg-[#FF000033] rounded-full w-10 h-10 flex justify-center items-center">
                <FaSignOutAlt
                  size={26}
                  className="flex-shrink-0 w-5 h-5 transition duration-75 text-[#fe5252] text-sm"
                  aria-hidden="true"
                />
              </div>
              <ListItemText
                primary={"Sign Out"}
                className="text-sm flex-1 ml-3 whitespace-nowrap text-[#484848]"
              />
            </ListItem>
          </Link>
        </List>
      </div>
    </aside>
  );
};

export default Sidebar;
