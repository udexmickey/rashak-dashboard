import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOptionMenu from "@/components/ui/Tables/table.options";
import { IconType } from "react-icons/lib";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { MemberProp } from "@/utils/types/members.type";

interface OptionItem {
  icon: IconType;
  text: string;
}

type Props = {
  data: Record<string, any>[];
  options: OptionItem[];
  handleOptionClick: (
    optionName: string,
    clickedMemberId: string,
    selectedMember?: string
  ) => void;
  member: string;
  headers: string[];
  isLoading: boolean;
};

export default function MemberTable({
  data,
  options,
  handleOptionClick,
  headers,
  isLoading,
  member,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers &&
              headers.flatMap((header) => (
                <TableCell
                  className="p-6 border-b border-gray-200 pb-0"
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
            data?.map((row: Partial<MemberProp>) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="p-4 border-b border-gray-200">
                  <Link href={`member-${member}/${row?._id}`}>
                    <div className="flex items-center px-0 whitespace-nowrap ">
                      {(row.image || null) && (
                        <Image
                          className="w-10 h-10 rounded-full"
                          src={(row.image as unknown as string) ?? ""}
                          alt={`${row.name} image`}
                          width={40}
                          height={40}
                        />
                      )}
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {`${row?.name?.slice(0, 25)} ${
                            (row?.name as string).length >
                            (row?.name as string).slice(0, 22)?.length
                              ? "..."
                              : ""
                          }`}
                        </div>
                        <div className="font-normal text-gray-500">
                          {row?.email || ""}
                        </div>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {row?.role || ""}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {row?.linkdenLink || ""}
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
                    title={row?.name}
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
