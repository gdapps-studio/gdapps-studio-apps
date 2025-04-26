import { Header } from "@/app/_/header";
import type { Metadata } from "next";
import { Footer } from "./_/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDapps Studio",
  description:
    "We are your Web3 interface experts - We build modern, scalable front-end interfaces for Web3 startups. Using tools like Next.js, Wagmi, and RainbowKit, we transform designs into responsive, optimized solutions. From pre-seed to scaling, we focus on performance, user experience, and seamless implementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
