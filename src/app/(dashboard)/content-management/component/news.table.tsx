import React, { useState, useEffect, ChangeEvent } from "react";
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
  Stack,
  Button,
} from "@mui/material";
import EditOptionMenu from "@/components/ui/Tables/table.options";
import { BiPlus } from "react-icons/bi";
import Image from "next/image";
import { MdAutoDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const NewsTable: React.FC = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64cf213fffcda80aff51a4e7.mockapi.io/api/v1/blogs?limit=2"
        );
        const data = await response.json();
        setData(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleOptionClick = (optionName: string, clickedAdminId: string) => {
    if (optionName.toLowerCase() === "re-assign") {
      //   setModalType("re-assign");
      console.log("Post edited Successfully");
    } else if (optionName.toLowerCase() === "delete") {
      //   setModalType("delete");
      console.log("you Just deleted this post");
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex justify-between">
        <Typography>Available Media & News Content</Typography>
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
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
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
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-200">
                        {new Date(item.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-200">
                        <EditOptionMenu
                          adminId={""}
                          options={options}
                          handleOptionClick={handleOptionClick}
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
            LinkComponent={'a'}
            href="/content-management/news"
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
      </Paper>
    </div>
  );
};

export default NewsTable;
