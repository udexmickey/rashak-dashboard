import Link from "next/link";
import React from "react";

export default function AdminTable() {
  const dataArray = [
    {
      id: "123",
      title: "Oladapo Koiki",
      email: "races@gmail.com",
      Department: "Communications",
    },
    {
      id: "223",
      title: "Abdulbasit Ibrahim",
      email: "gaza@gmail.com",
      Department: "IT",
    },
    {
      id: "323",
      title: "Ibrahim Sandra",
      email: "santo@gmail.com",
      Department: "IT",
    },
    {
      id: "423",
      title: "Barakat Tosin",
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
          {dataArray &&
            dataArray.map((admin, idx) => (
              <tr className="bg-white text-lg border-b" key={admin.title}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  <Link href={"#"}>
                    {idx + 1}. &nbsp; {window.innerWidth >= 768 &&  <span> &nbsp;</span> } {admin.title}
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
