// components/TopNav.tsx

import { FaBell } from 'react-icons/fa';

const TopNav: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <header className="flex justify-between p-4 bg-white text-[#1E1E1E] border-b border-gray-300">
        <div className="flex items-center">
            <div className="lg:w-64">
                <div className="w-12 h-12 bg-[#ED7524]"></div>
            </div>
            <h1 className="text-2xl font-bold">{pageName}</h1>
        </div>
        <FaBell size={24} className="text-[#ED7524]" />
    </header>
  );
};

export default TopNav;
