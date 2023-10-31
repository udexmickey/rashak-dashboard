// components/Sidebar.tsx
import { IconType } from "react-icons/lib";
import { FaHome, FaCog, FaUsers, FaFile, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

interface SidebarItemProps {
  icon: IconType;
  text: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  text,
  href,
}) => {
  return (
    <Link href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <Icon size={26} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
      <span className="text-sm flex-1 ml-3 whitespace-nowrap">{text}</span>
    </Link>
  );
};

const sidebarItems = [
  { icon: FaHome, text: "Dashboard", href: "/" },
  { icon: FaCog, text: "Settings", href: "/settings" },
  { icon: FaUsers, text: "User Management", href: "/user-management" },
  { icon: FaFile, text: "File Management", href: "/file-management" },
  { icon: FaSignOutAlt, text: "Sign Out", href: "/sign-out" },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li className="flex flex-col h-full">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                href={item.href}
              />
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
