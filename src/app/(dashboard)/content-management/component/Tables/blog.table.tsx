import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent,
  Typography,
  CircularProgress,
  Paper,
  Pagination,
  Button,
} from "@mui/material";
import EditOptionMenu from "@/components/ui/Tables/table.options";
import { BiPlus } from "react-icons/bi";
import Image from "next/image";
import { MdAutoDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "../confirmation/deleteContentModal";

const BlogsTable: React.FC = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data } = useFetchData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [contentId, setContentId] = React.useState<string>("");
  const [selectedContent, setSelectedContent] = React.useState<
    string | undefined
  >("");
  const router = useRouter();

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const sortedData = [...data].sort((a, b) => {
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
      router.push(`content-management/blogs/${clickedContentId}`);
    } else if (optionName.toLowerCase() === "delete") {
      setSelectedContent((prev) => (prev = selectedContent));
      setContentId((prev) => (prev = clickedContentId));
      setOpenModal(true);
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex justify-between">
        <Typography>Available Blogs Content</Typography>
        <div className="flex-row items-center">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy as any}
              label="Sort By"
              style={{ minWidth: "150px" }}
              onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Paper
        elevation={3}
        style={{ maxHeight: "60dvh", overflowY: "auto", height: "100dvh" }}
        className="flex flex-col justify-between items-around"
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="p-6 border-b border-gray-200">
                  Item
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  Date Created
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                sortedData
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="p-4 border-b border-gray-200">
                        <Link href={`content-management/blogs/${item.id}`}>
                          <div className="flex items-center px-2 whitespace-nowrap ">
                            <Image
                              className="w-10 h-10 rounded-full"
                              src={item.image as string}
                              alt="Jese image"
                              width={40}
                              height={40}
                            />
                            <div className="ps-3">
                              <div className="text-base font-semibold">
                                {`${item.title.slice(0, 25)} ${
                                  item.title.length >
                                  item.title.slice(0, 22).length
                                    ? "..."
                                    : ""
                                }`}
                              </div>
                              {/* <div className="font-normal text-gray-500">
                              neil.sims@flowbite.com
                            </div> */}
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-200">
                        {new Date(item.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-200">
                        <EditOptionMenu
                          adminId={item.id}
                          options={options}
                          handleOptionClick={handleOptionClick}
                          title={item.title}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex justify-around items-end my-8 rounded-lg">
          <Pagination
            count={Math.ceil(sortedData.length / rowsPerPage)}
            onChange={handleChangePage}
            page={page}
            siblingCount={0}
            boundaryCount={2}
          />
          <Button
            variant="contained"
            LinkComponent={"a"}
            href="/content-management/blogs"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            type="submit"
            className="px-6 !text-base py-2 capitalize float-right "
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
          >
            Add New post {` `} <BiPlus size={25} />
          </Button>
        </div>

        {openModal && (
          <DeleteConfirmModal
            contentId={contentId}
            selectedContent={selectedContent}
            handleClose={() => setOpenModal(false)}
          />
        )}
      </Paper>
    </div>
  );
};

export default BlogsTable;
