"use client";
import NotificationCard, {
  NotificationProps,
} from "@/components/ui/cards/notificationCard";
import EmptyStateNotification from "@/components/ui/placeholders/notification.placeholder";
import activityLogData from "./notification.activitylogs.json";
import React, { useState } from "react";

export default function Notification() {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [data, setData] = useState<NotificationProps[]>(activityLogData);
  return (
    <div>
      {isEmpty ? (
        <EmptyStateNotification />
      ) : (
        <NotificationCard initialValues={data && data} />
      )}
    </div>
  );
}
