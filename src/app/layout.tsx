import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Maintance from "@/components/ui/placeholders/maintance.placeholder";
import useIsMobile from "@/hooks/useIsMobile";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--Montserrat-font",
  display: "swap",
});

const client_Url: string | URL =
  (process.env.NEXT_PUBLIC_BASE_URL as string | URL)

const description: string =
  "The Rashak Management System is a comprehensive platform designed to streamline various aspects of organizational management. It provides functionalities for managing team members, board members, partners, news, blogs, and stories. The system integrates with third-party services like Cloudinary for efficient media file storage and utilizes Nodemailer for seamless email communication.";

export const metadata: Metadata = {
  title: {
    default: "Rashak Management System",
    template: "%s | Rashak Management System",
  },
  description: description.slice(0, 80) + "...",
  keywords:
    "Agriculture investment, investment, rashak, Farm, Rashak, RashakAgro, rashakagro, Farm investment , farm Business, Agriculture, Nature, farm Technology, agriculture technology, farm blog, agriculture news",
  generator: "Rashak",
  applicationName: "Rashak",
  referrer: "origin-when-cross-origin",
  creator: "Dimgba Micheal",
  metadataBase: new URL(client_Url),
  alternates: {
    canonical: client_Url,
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: {
      default: "Rashak",
      template: "%s | Rashak",
    },
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/rashak-og.png`,
        width: 1200,
        height: 630,
        type: "image/png",
      },
      {
        url: "/rashak-logo-svg.svg",
        width: 350,
        height: 400,
        alt: "Rashak alt",
        type: "image/svg",
      },
    ],
    url: client_Url,
    siteName: "Rashak",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        {/* The line below clears the mobile designs till they want it */}
        <div className={`${process.env.NODE_ENV !== 'development' ? "sm:block hidden" : null}`}>{children}</div>
        <div className={`${process.env.NODE_ENV !== 'development' ? 'block sm:hidden' : null }`}>
          <Maintance />
        </div>
      </body>
    </html>
  );
}
