import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { postUpload } from "@/utils/types/PostData.types";
import EditOptionMenu from "@/components/ui/Tables/table.options";
import { IconType } from "react-icons/lib";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

interface OptionItem {
  icon: IconType;
  text: string;
}

type Props = {
  data: Record<string, any>[];
  options: OptionItem[];
  handleOptionClick: (
    optionName: string,
    clickedContentId: string,
    selectedContent?: string
  ) => void;
  headers: string[];
  isLoading: boolean;
  label: string;
};

export default function ContentTable({
  data,
  options,
  handleOptionClick,
  headers,
  isLoading,
  label,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers &&
              headers.flatMap((header) => (
                <TableCell
                  className="p-6 border-b border-gray-200"
                  key={header}
                >
                  {header}
                </TableCell>
              ))}
            <TableCell className="p-4 border-b border-gray-200">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            data &&
            data?.map((row: Partial<postUpload>) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="p-4 border-b border-gray-200">
                  <Link href={`content-management/${label}/${row?._id}`}>
                    <div className="flex items-center px-2 whitespace-nowrap ">
                      {(row.image || row.media) && (
                        <Image
                          className="w-10 h-10 rounded-full"
                          src={
                            (row.image as string) ?? (row.media as string) ?? ""
                          }
                          alt={`${
                            row?.title ?? row?.author ?? row?.name
                          } image`}
                          width={40}
                          height={40}
                        />
                      )}
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {`${(row?.title ?? row?.author ?? row?.name)?.slice(
                            0,
                            25
                          )} ${
                            ((row?.title ?? row?.author ?? row?.name) as string)
                              .length >
                            (
                              (row?.title ?? row?.author ?? row?.name) as string
                            ).slice(0, 22)?.length
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
                  {row &&
                    new Date(row?.createdAt as string | Date).toDateString()}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  <EditOptionMenu
                    adminId={row?._id as string}
                    options={options}
                    handleOptionClick={handleOptionClick}
                    title={row?.title ?? row?.author ?? row?.name}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
