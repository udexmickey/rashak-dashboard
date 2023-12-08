"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const CheckPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is registered
    const isRegistered = localStorage.getItem("isRegistered");

    if (!isRegistered) {
      router.push("/login");
    }

    // After user visits the CheckPage
    const timeSession = setTimeout(() => {
      localStorage.removeItem("isRegistered");
    }, 3000);

    return () => clearTimeout(timeSession);
  }, [router]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{ height: "100dvh", textAlign: "center", display: "flex" }}
    >
      <Grid item xs={12}>
        <div style={{ position: "absolute", top: 40, left: 40 }}>
          <Image
            src="/rashak-logo-svg.svg"
            alt="Logo"
            width={170}
            height={170}
          />
        </div>
      </Grid>
      <Grid xs={12} className="max-w-4xl mx-auto px-4">
        <Typography variant="h4" color={"#00A651"}>
          Welcome to Rashak
        </Typography>
        <Typography variant="body1" paragraph className="text-2xl">
          Your account was registered successfully. Please check your email for
          confirmation within the next hour. If you do not receive an email or
          have any issues, please contact the IT department.
        </Typography>
        <br />
        <br />
        <Typography variant="body1" paragraph className="text-xl">
          In the meantime...{" "}
        </Typography>
        <div className="gap-x-8 flex justify-center items-center flex-col md:flex-row gap-y-4 mt-12">
          <Link
            href="https://web.rashakagro.com/"
            target="_blank"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            className="rounded-[2.5rem] px-6 text-xl py-2 md:py-4 capitalize"
          >
            Visit our website
          </Link>

          <span>OR</span>

          <Link
            href={"/login"}
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            className="rounded-[2.5rem] px-6 text-xl py-2 md:py-4 capitalize"
          >
            Log In
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default CheckPage;
