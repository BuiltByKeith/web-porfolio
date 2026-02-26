import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "BuiltByKeith",
  description:
    "Web Portfolio of Keith, a passionate web developer specializing in React, Next.js, and Laravel full stack web development. Explore my projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
