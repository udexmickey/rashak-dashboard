import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import AuthLayout from "@/components/authentication/auth.layout";
import ResetPasswordForm from "@/components/authentication/resetPasswordForm";

export const revalidate = 3600; // revalidate at most every hour

// =========SEO for single post=============
type Props = {
  params: { resetpasswordId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { resetpasswordId } = params;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Reset password",
    // description: "",
    alternates: {
      canonical: `/reset-password/${resetpasswordId}`,
    },
    openGraph: {
      images: [
        // {
        //   url: `${"/sign_up_girl.png"}`,
        //   width: 1200,
        //   height: 630,
        // },
        ...previousImages,
      ],
    },
  };
}

// +++==================The main post itself=======================

export default async function ResetPasswordPost({
  params,
}: {
  params: { resetpasswordId: string };
}) {
  
  return (
    <AuthLayout backgroundImage="/sign_up_girl.png">
      <ResetPasswordForm params={params} />
    </AuthLayout>
  );
}