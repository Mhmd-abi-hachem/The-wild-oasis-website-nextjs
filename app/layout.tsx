import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import "./_styles/globals.css";
import ToasterContainer from "@/components/ui/ToasterContainer";
import { connectDB } from "@/lib/dbConnect";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

connectDB();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative overflow-x-hidden`}
      >
        <ToasterContainer />
        {children}
      </body>
    </html>
  );
}
