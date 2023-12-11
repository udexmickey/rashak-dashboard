"use client";
import authApi from "../authApi";

export async function logOutApi() {
  try {
    const response = await authApi.post("/auth/logout");

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login page
    window.location.href = "/login";
    return { success: true, message: response.data.message };
  } catch (error: any) {
    throw new Error(error?.response?.data.message ?? error?.message);
  }
}
