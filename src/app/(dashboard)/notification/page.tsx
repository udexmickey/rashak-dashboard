"use client";
import NotificationCard, {
  NotificationProps,
} from "@/components/ui/cards/notificationCard";
import EmptyStateBox from "@/components/ui/placeholders/notification.placeholder";
import activityLogData from "./notification.activitylogs.json";
import React, { useState } from "react";

export default function Notification() {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [data, setData] = useState<NotificationProps[]>(activityLogData);
  return (
    <div>
      {isEmpty ? (
        <EmptyStateBox page={"notification"} />
      ) : (
        <NotificationCard initialValues={data && data} />
      )}
    </div>
  );
}
