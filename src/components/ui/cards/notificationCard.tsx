import { Box, Typography, List, ListItem, Avatar } from "@mui/material";
import Link from "next/link";
import * as React from "react";

export interface NotificationProps {
  id: string;
  description: string;
  action: string;
  userId: string;
  adminId: string;
  event: string;
  isApproved: boolean;
  createdAt: Date | string;
}

interface NotificationArrayDataProps {
  initialValues: NotificationProps[];
}

const NotificationCard: React.FC<NotificationArrayDataProps> = ({
  initialValues,
}) => {
  return (
    <Box>
      <div
        id="dropdownNotification"
        className="z-20 w-full bg-white divide-y divide-gray-100 rounded-lg shadow "
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-left text-gray-700 rounded-t-lg bg-gray-50 ">
          Notifications
        </div>
        <div className="divide-y divide-gray-100 ">
          {initialValues.map((activity: NotificationProps) => {
            return (
              <div
                className="flex px-4 py-3 hover:bg-gray-100 "
                key={activity.id}
              >
                <div className="w-full ps-3">
                  <div className="text-gray-500 text-sm mb-1.5 ">
                    <p className="font-semibold text-gray-900 ">
                      {activity.action} --{" "}
                      <span className="font-medium text-gray-900 ">
                        {" "}
                        {activity.event}
                      </span>
                    </p>
                    <p>{activity.description}</p>
                  </div>
                  <div className="text-xs text-blue-600 ">
                    {new Date(activity.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {
            initialValues.length < 10 && //i should convert it to less than
        <Link
          href="#"
          className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100  "
        >
          <div className="inline-flex items-center ">
            <svg
              className="w-4 h-4 me-2 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View all
          </div>
        </Link>
        }
      </div>
    </Box>
  );
};

export default NotificationCard;
