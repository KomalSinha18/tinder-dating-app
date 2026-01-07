import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "Dating App - Find Your Perfect Match",
  description: "Modern dating app built with Next.js,Firebase and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
