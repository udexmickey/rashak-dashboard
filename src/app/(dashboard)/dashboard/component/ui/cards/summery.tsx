"use client";
import React from "react";
import { IconType } from "react-icons";

export interface ISummery {
  title: string;
  icon: IconType;
  color: string;
  amount: number;
}

export default function SummeryCard({
  title,
  icon: Icon,
  amount,
  color,
}: ISummery) {
  return (
    <div
      className={`py-8 px-4 max-w-sm w-full bg-[${color}] rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 justify-between`}
    >
      <div className="flex justify-center items-center gap-x-4">
        <div className="bg-white rounded-full h-16 w-16 flex justify-center items-center">
          <Icon
            size="40px"
            className={`text-[${
              color === "#C7FFE2" ? "#00A651" : "#F5821F"
            }] rounded-sm`}
          />
        </div>
        <div className="text-[#484848] max-w-24">{title}</div>
      </div>
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className=" text-[#F5821F] font-semibold text-4xl">
            {" "}
            {amount ?? "30"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
