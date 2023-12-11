"use client";
import Link from "next/link";
import React from "react";

export default function Error({
  // error, reset }: {error: Error; reset: () => void})
  // : React.JSX.Element {
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-[96dvh] md:px-8 px-4 mx-auto max-w-[114rem] w-screen break-words custom-overflow-wrap-anywhere h-full bg-slate-800 text-white">
      <div className="flex justify-center items-center flex-col gap-y-4">
        <h1 className="md:text-4xl text-2xl text-red-600">
          Oops!!! An Error Occured
        </h1>
        <h4 className="md:text-5xl text-2xl text-center font-extrabold text-gray-600">
          {`There's no post available at the moment`}
        </h4>
        {process.env.NODE_ENV !== "production" && (
          <>
            <div className="md:text-2xl text-xl text-gray-600">
              {`Error message => ${error.message}`}
            </div>
            <div>
              {`Error Cause => ${error.cause}`}
              {`Error stack => ${error.stack}`}
            </div>
          </>
        )}

        <div className="md:text-base text-sm text-gray-600 mx-auto">
          <button
            className="outline-4 outline-[#00A651] rounded-lg border-[#00A651] border-solid border-spacing-1 p-3 duration-200 ease-in-out hover:bg-[#F5821F] bg-[#00A651] text-slate-900 hover:text-black-800 cursor-pointer"
            onClick={reset}
          >
            Try again{" "}
          </button>{" "}
          |{" "}
          <Link
            href="/"
            className="rounded-lg ring-[#00A651] ring-solid ring-1 p-3 duration-200 ease-in hover:bg-[#00A651] text-white hover:text-slate-200 cursor-pointer"
          >
            {" "}
            GO To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
