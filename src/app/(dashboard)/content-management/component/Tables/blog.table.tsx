import React, { useState, ChangeEvent } from "react";
import {
  SelectChangeEvent,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import { MdAutoDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "../confirmation/deleteContentModal";
import ContentTable from "./ContentTable";
import AddContentBtn from "../button/addContent.button";
import SortBy from "../sortby";
import EmptyStateBox from "@/components/ui/placeholders/notification.placeholder";
import {
  useDeleteOneBlog,
  useFetchAllBlogs,
} from "@/hooks/content-management/useBlogHook";

const BlogTable: React.FC = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isLoading, data, isError } = useFetchAllBlogs({
    searchText: "",
    pageNumber: page,
    pageSize: rowsPerPage,
  });
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [contentId, setContentId] = React.useState<string>("");
  const [selectedContent, setSelectedContent] = React.useState<
    string | undefined
  >("");
  const router = useRouter();

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const sortedData =
    data &&
    data?.data?.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  const options = [
    {
      icon: RiEditFill,
      text: "Edit",
    },
    {
      icon: MdAutoDelete,
      text: "Delete",
    },
  ];

  const handleOptionClick = (
    optionName: string,
    clickedContentId: string,
    selectedContent?: string
  ) => {
    if (optionName.toLowerCase() === "edit") {
      router.push(`content-management/blog/${clickedContentId}`);
    } else if (optionName.toLowerCase() === "delete") {
      setSelectedContent((prev) => (prev = selectedContent));
      setContentId((prev) => (prev = clickedContentId));
      setOpenModal(true);
    } else {
      return;
    }
  };

  const headers = ["Items", "Date Added"];
  const SortedItems = ["Newest", "Oldest"];

  const {
    isPending: isLoadingDelete,
    mutateAsync: deletePost,
    error: errorDelete,
    isError: idDeleteError,
    isSuccess: idDeleteSuccess,
  } = useDeleteOneBlog();

  const handleConfirmDeletion = async () => {
    //the delete function from useDeletePost hook
    await deletePost(contentId);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex justify-between">
        <Typography>Available Media & Blog Content</Typography>
        <div className="flex-row items-center">
          <SortBy
            sortBy={sortBy}
            setSortBy={(e: SelectChangeEvent) => setSortBy(e.target.value)}
            SortedItems={SortedItems}
          />
        </div>
      </div>

      <Paper
        elevation={3}
        style={{ maxHeight: "65dvh", overflowY: "auto", height: "58dvh" }}
        className="flex flex-col justify-between items-around"
      >
        {(!isError && data?.data?.length) < 1 ? (
          <EmptyStateBox page={"Blog"} />
        ) : (
          <>
            <ContentTable
              data={sortedData && sortedData}
              options={options}
              handleOptionClick={handleOptionClick}
              headers={headers && headers}
              isLoading={isLoading}
            />
          </>
        )}
        <div className="flex justify-around items-end my-8 rounded-lg">
          {(!isError && data?.data?.length) > 1 && (
            <Pagination
              count={data && Math.ceil(data?.totalItems / rowsPerPage)}
              onChange={handleChangePage}
              page={page}
              siblingCount={0}
              boundaryCount={4}
            />
          )}

          <AddContentBtn
            href={"/content-management/blogs"}
            label="Add New post"
          />
        </div>

        {/* <div className="flex justify-around items-end my-8 rounded-lg"></div> */}
        {/* The following will only be displayed/rendered when the edit button is clicked on the table */}
        {openModal && (
          <DeleteConfirmModal
            contentId={contentId}
            selectedContent={selectedContent}
            handleClose={() => setOpenModal(false)}
            error={errorDelete}
            isError={idDeleteError}
            isLoading={isLoadingDelete}
            handleConfirm={handleConfirmDeletion}
            isSuccess={idDeleteSuccess}
          />
        )}
      </Paper>
    </div>
  );
};

export default BlogTable;
