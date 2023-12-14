import authApi from "../authApi";

export async function getOverviewCounts() {
  try {
    const response = await authApi.get("/overview");

    return await response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data.message ?? error?.message);
  }
}
