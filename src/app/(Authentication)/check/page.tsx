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
      
    }, 2000);

    return () => clearTimeout(timeSession);

  }, [router]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh", textAlign: "center" }}
    >
      <Grid item xs={12}>
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <Image
            src="/rashak-logo-svg.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
      </Grid>
      <Grid item xs={12} className="max-w-xl mx-auto px-4">
        <Typography variant="h4" gutterBottom color={"#00A651"}>
          Welcome to Rashak
        </Typography>
        <Typography variant="body1" paragraph className="">
          Your account was registered successfully. Please check your email for
          confirmation within the next hour. If you do not receive an email or
          have any issues, please contact the IT department.
        </Typography>
        {/* </Grid>
      <Grid item xs={12}> */}
        <Typography variant="body1" paragraph>
          In the meantime..{" "}
        </Typography>
        <div className="gap-x-8 flex justify-center items-center flex-col md:flex-row gap-y-4 mt-12">
          <Link href="https://web.rashakagro.com/">
            <Button
              variant="contained"
              style={{ backgroundColor: "#00A651", color: "#ffffff" }}
              type="submit"
              className="rounded-[2.5rem] px-6 !text-base py-2 md:py-4 capitalize"
              sx={{
                "&:focus": { backgroundColor: "#00A651" },
                "&.Mui-error": { backgroundColor: "red" },
              }}
            >
              Visit our website
            </Button>
          </Link>

          <span>OR</span>

          <Link href={"/login"}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#00A651", color: "#ffffff" }}
              type="submit"
              className="rounded-[2.5rem] px-6 !text-base py-2 md:py-4 capitalize"
              sx={{
                "&:focus": { backgroundColor: "#00A651" },
                "&.Mui-error": { backgroundColor: "red" },
              }}
            >
              Log In
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default CheckPage;
