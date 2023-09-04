import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import AuthProvider from "./utils/AuthProvider";

export const metadata: Metadata = {
  title: "Quizify",
  description: "Test your knowledge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="relative font-primary sm:grid sm:grid-cols-12 min-h-[100vh]">
            <div className="hidden sm:block sm:col-span-2 bg-dark-blue"></div>
            <div className="sm:col-span-8">{children}</div>
            <div className="hidden sm:block sm:col-span-2 bg-dark-blue"></div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
