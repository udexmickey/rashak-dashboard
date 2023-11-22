import Link from "next/link";
import Image from "next/image";

export default async function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        {/* Logo */}
        {/* <Image
          src={'/rashak-logo-svg.svg'}

          alt="Your Logo Alt Text"
          className="absolute top-6 left-6 h-12 w-12"
        /> */}

<div className="lg:w-72 max-h-max">
            <Link href="/" as={"/"} className="-m-1.5 p-1.5 max-w-max max-h-12">
              <span className="sr-only">Rashak logo</span>
              <Image
                src={"/rashak-logo-svg.svg"}
                loading="eager"
                priority={true}
                className="max-w-max w-full h-7 md:h-9"
                alt={"Rashak logo"}
                quality={100}
                sizes="max-w-max"
                width={108}
                height={28}
                aria-hidden="true"
              />
            </Link>
          </div>

        <div className="text-center">
          <p className="text-base font-semibold text-[var(--orange-box-bg)]">
            404
          </p>
          <h1 className="font-semibold font-mono text-3xl tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-[var(--green-box-bg)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--orange-box-bg) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green-box-bg)]"
            >
              Go back home
            </Link>
            <Link
              href="contact"
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
