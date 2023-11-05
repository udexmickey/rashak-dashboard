import Layout from "@/components/menu/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout pageName={"Dashboard"}>{children}</Layout>;
}
