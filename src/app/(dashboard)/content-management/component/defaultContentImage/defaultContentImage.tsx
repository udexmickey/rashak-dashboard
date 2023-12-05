import React from "react";

export default function DefaultContentImageUI({
  maxWidth,
  height,
}: {
  maxWidth: number;
  height: number;
}) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center pt-5 pb-6 max-w-[${maxWidth}px] w-full h-[${height}dvh]`}
      >
        <svg
          className="w-8 h-8 mb-4 text-gray-500 bg-[#D9D9D9]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 bg-[#D9D9D9]">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500 bg-[#D9D9D9]">
          PNG, or JPG (MAX. 800x400px)
        </p>
      </div>
    </>
  );
}
