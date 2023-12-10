"use client";

import useIsLoggedIn from "@/hooks/UseIsLoggedIn";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { isLoggedIn, checkAuthAndRedirect } = useIsLoggedIn();

  useEffect(() => {
    // Check if user is LoggedIn
    const isLoggedIn = localStorage.getItem("authToken") !== null;

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return <div>{/* Welcome Are you logged in ?  */}</div>;
}
