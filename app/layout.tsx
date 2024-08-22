import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chatz } from "@/components/chatz";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Scholar",
  description: "Smart Scholar is an innovative online platform designed to empower students with cutting-edge AI tools that simplify their academic journey. Whether it's summarizing complex texts, receiving personalized career path advice, or breaking down challenging topics in a way that’s easy to understand, Smart Scholar is your go-to resource for smarter learning. With a focus on clarity and accessibility, this platform is dedicated to helping students excel in their studies and make informed decisions about their futures. Smart Scholar—where intelligence meets simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
     
      <body className={inter.className}>
       <div className="z-10 fixed">
      <Navbar />
      </div> 
        {children}
       <Chatz />
        </body>
    </html>
      </ClerkProvider>
  );
}
