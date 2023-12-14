import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";

export interface NotificationProps {
  _id: string;
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
          {initialValues &&
            initialValues?.map((activity: NotificationProps) => {
              return (
                <div
                  className="flex px-4 py-3 hover:bg-gray-100 "
                  key={activity._id}
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
                    <div className="text-xs text-[#F5821F] ">
                      {new Date(activity.createdAt).toDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Box>
  );
};

export default NotificationCard;
