import "./globals.css";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import ThemeProvider from "@/utils/theme-provider";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "PicoURL",
  description: "PicoURL is a simple service that provides short URLs",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body className={rubik.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />

            <main className="w-full">
              <Header />
              {children}
            </main>
          </SidebarProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
