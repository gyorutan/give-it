import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/context/ToasterContext";

const font = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GIVE IT !",
  description: "友達と無料配布！",
  icons: {
    icon: ["image/png", "/siteLogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
