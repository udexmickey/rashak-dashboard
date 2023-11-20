"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TbUsersPlus } from "react-icons/tb";
import { PiUserSwitchFill } from "react-icons/pi";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import MemberConfirmModal from "../confirmationUI/confirm.member.modal";

interface MemberCardProps {
  title: string;
  handleReassign: (adminId: string, selectedMember: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ title }) => {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleAssignClick = () => {
    selectedMember !== "" && setShowConfirmationModal(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMember((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    console.log("selectedMember", selectedMember);
  }, [selectedMember]);

  return (
    <>
      <FormControl
        style={{ color: "#484848" }}
        className="grid place-items-center gap-y-12"
      >
        <FormLabel
          id="demo-customized-radios"
          className="text-lg font-medium place-self-start"
        >
          {title}
        </FormLabel>
        <RadioGroup
          defaultValue=""
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
          className="grid w-full gap-6 md:grid-cols-2"
          value={selectedMember}
          onChange={handleChange}
        >
          <div>
            <input
              type="radio"
              id="hosting-small"
              name="hosting"
              className="hidden peer"
              onChange={(e) => setSelectedMember(e.target.value)}
              value={"team"}
            />

            <label
              htmlFor="hosting-small"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-[#FFE8D9] border border-gray-200 rounded-lg cursor-pointer peer-checked:text-[#484848] hover:text-gray-600 hover:bg-gray-100 peer-checked:ring-[#00A651] box-border peer-checked:border-[#00A651] peer-checked:bg-[#C7FFE2] h-24"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold flex max-w-max items-center justify-center">
                  <span className="rounded-full bg-white h-14 w-14 flex items-center justify-center">
                    <TbUsersPlus size={24} />
                  </span>
                  &nbsp; &nbsp;
                  <span>Team Member</span>
                </div>
              </div>
            </label>
          </div>
          <div className="">
            <input
              type="radio"
              id="hosting-big"
              name="hosting"
              value={"board"}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="hosting-big"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-[#FFE8D9] border border-gray-200 rounded-lg cursor-pointer peer-checked:text-[#484848] hover:text-gray-600 hover:bg-gray-100 peer-checked:ring-[#00A651]  peer-checked:border-[#00A651] peer-checked:bg-[#C7FFE2] h-24"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold flex max-w-max items-center justify-center">
                  <span className="rounded-full bg-white h-14 w-14 flex items-center justify-center">
                    <PiUserSwitchFill size={24} />
                  </span>
                  &nbsp; &nbsp;
                  <span>Board Member</span>
                </div>
              </div>
            </label>
          </div>
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"
          style={{ color: "#fff", backgroundColor: '#00A651' }}
          className="max-w-max w-full grid place-items-center px-12 py-4 rounded-2xl"
          onClick={handleAssignClick}
          disabled={selectedMember === ""}
        >
          Sellect
        </Button>

        {showConfirmationModal && (
          <MemberConfirmModal
            handleClose={() => setShowConfirmationModal(false)} selectedMember={selectedMember}          />
        )
        }
      </FormControl>
    </>
  );
};

export default MemberCard;
