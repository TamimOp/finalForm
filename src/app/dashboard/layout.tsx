import { Header } from "@/components/Header";
import Verify from "@/components/Verify";
import AuthOnly from "@/providers/AuthOnly";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthOnly>{children}</AuthOnly>;
}
