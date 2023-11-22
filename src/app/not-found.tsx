import Link from "next/link";
import Image from "next/image";

export default async function NotFound() {
  return (
    <main className="px-4 py-4 sm:py-8 lg:px-8 flex flex-col items-center">
      {/* logo section */}
      <div className="lg:w-72 grid place-items-start place-self-start">
        <Link href="/" as={"/"} className="-m-1.5 p-1.5 max-w-max max-h-12">
          <span className="sr-only">Rashak logo</span>
          <Image
            width={108}
            height={28}
            src={"/rashak-logo-svg.svg"}
            loading="eager"
            className="max-w-max w-full h-7 md:h-9"
            alt={"Rashak logo"}
            sizes="max-w-max"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* content section */}

      <div className="min-h-[80dvh] bg-gray-50 max-w-6xl w-full flex flex-col md:flex-row items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700 gap-x-12">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
              {" "}
              404
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8 ">
              {`Sorry we couldn't find the page you're looking for`}
            </p>

            <Link
              href="/"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-700 hover:bg-green-800"
            >
              back to homepage
            </Link>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <Image
              width={608}
              height={528}
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              className=""
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
