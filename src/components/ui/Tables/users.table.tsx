'use client'
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
import React from "react";

export default function AdminTable() {
  const { isMobile } = useIsMobile();
  
  const usermanagementData = [
    {
      id: "123",
      name: "Oladapo Koiki",
      email: "races@gmail.com",
      Department: "Communications",
    },
    {
      id: "223",
      name: "Abdulbasit Ibrahim",
      email: "gaza@gmail.com",
      Department: "IT",
    },
    {
      id: "323",
      name: "Ibrahim Sandra",
      email: "santo@gmail.com",
      Department: "IT",
    },
    {
      id: "423",
      name: "Barakat Tosin",
      email: "john@gmail.com",
      Department: "Communications",
    },
  ];

  const handleAccept = (id: string) => {
    // Add your logic to handle accept action here
    console.log(`Accepted: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Add your logic to handle delete action here
    console.log(`Deleted: ${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left w-full">
        <tbody className="bg-white text-base text-[#1E1E1E] ">
          {usermanagementData &&
            usermanagementData.map((admin, idx) => (
              <tr className="bg-white text-lg border-b" key={admin.name}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  <Link href={"#"}>
                    {idx + 1}. &nbsp; {isMobile &&  <span> &nbsp;</span> } {admin.name}
                  </Link>
                </th>
                <td
                  className="px-6 py-4 text-[#00A651]"
                  onClick={() => handleAccept(admin.id)}
                >
                  <div className="cursor-pointer hover:opacity-60 max-w-max">
                    Accept
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-[#FF0000]"
                  onClick={() => handleDelete(admin.id)}
                >
                  <div className="cursor-pointer hover:opacity-60 max-w-max">
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
