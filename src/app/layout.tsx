import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { FaBell } from "react-icons/fa";
import Layout from "@/components/Layout";
import TopNav from "@/components/TopNav";

const inter = Inter({ subsets: ["latin"] });

const client_Url: string | URL = process.env.NEXT_PUBLIC_BASE_URL as string | URL ?? process.env.NEXT_PUBLIC_TEST_URL  as string | URL;

const description: string =
  "The Rashak Management System is a comprehensive platform designed to streamline various aspects of organizational management. It provides functionalities for managing team members, board members, partners, news, blogs, and stories. The system integrates with third-party services like Cloudinary for efficient media file storage and utilizes Nodemailer for seamless email communication.";

export const metadata: Metadata = {
  title: {
    default: 'Rashak Management System',
    template: '%s | Rashak Management System'
  },
  description: description.slice(0, 80) + '...',
  keywords: ['Agriculture investment', ' investment', ' rashak', ' Farm', ' Rashak', ' RashakAgro', ' rashakagro', ' Farm investment ', ' farm Business', ' Agriculture', ' Nature', ' farm Technology', ' agriculture technology', ' farm blog', ' agriculture news'],
  generator: 'Rashak',
  applicationName: 'Rashak',
  referrer: 'origin-when-cross-origin',
  creator: 'Dimgba Micheal',
  metadataBase: new URL(client_Url),
  alternates: {
    canonical: client_Url,
    languages: {
      'en-US': '/en-US',
      // 'de-DE': '/de-DE',
    },
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: {
      default: 'Rashak',
      template: '%s | Rashak'
    },
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/rashak-og.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
      },
      {
        url: '/rashak-logo-svg.svg',
        width: 350,
        height: 400,
        alt: 'Rashak alt',
        type: 'image/svg',
      },
    ],
    description: 'Rashak is an agri tech company that empowers small holder farmers by providing access to market, financial services and robust data driven support to ...',
    url: client_Url,
    siteName: 'Rashak',
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_ANALYTICS_URL}?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}/rashak-logo-svg.svg`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* {children} */}
        <Layout pageName={"Dashboard"}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
