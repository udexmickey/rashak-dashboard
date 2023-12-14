"use client";
import NotificationCard, {
  NotificationProps,
} from "@/components/ui/cards/notificationCard";
import EmptyStateBox from "@/components/ui/placeholders/notification.placeholder";
// import activityLogData from "./notification.activitylogs.json";
import React, { ChangeEvent, useState } from "react";
import { useFetchNotification } from "@/hooks/useNotification";
import { Pagination } from "@mui/material";

export default function Notification() {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  // const [data, setData] = useState<NotificationProps[]>(activityLogData);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const {
    data: activityLogData,
    isLoading,
    isError,
  } = useFetchNotification({
    searchText: "",
    pageNumber: page,
    pageSize: rowsPerPage,
  });

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  // console.log("activityLogData", activityLogData);

  return (
    <div>
      {!isError && activityLogData?.data?.length < 1 ? (
        <EmptyStateBox page={"notification"} />
      ) : (
        <div className="bg-white h-[80dvh]">
          <div className="h-[88%]">
            <NotificationCard
              initialValues={!isError && activityLogData?.data}
            />
          </div>
          <div className="grid place-items-center my-8">
            <Pagination
              count={
                activityLogData &&
                Math.ceil(activityLogData?.totalItems / rowsPerPage)
              }
              onChange={handleChangePage}
              page={page}
              siblingCount={0}
              boundaryCount={4}
            />
          </div>
        </div>
      )}
      {/* {(!isError && activityLogData?.data?.length) < 1 && ( */}
      {/* )} */}
    </div>
  );
}
