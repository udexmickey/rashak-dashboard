import React from "react";
import { GoFileDirectoryFill } from "react-icons/go";

const EmptyStateNotification: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen max-h-[80dvh] bg-white">
      <div className="text-center">
        {/* Icon */}
        <div className="grid place-items-center">
          <GoFileDirectoryFill color="grey" size={140} />
        </div>

        {/* Title Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          No Notifications yet
        </h1>

        {/* Sub Text */}
        <p className="text-gray-500 mt-2">
          As soon as you receive a notification, it will be shown here
        </p>
      </div>
    </div>
  );
};

export default EmptyStateNotification;
