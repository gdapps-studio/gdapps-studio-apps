import { Header } from "@/app/_/header";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Footer } from "./_/footer";
import "./globals.css";

// const oxaniumFont = localFont({
//   variable: "--font-oxanium",
//   src: [
//     {
//       path: "~@gdapps-studio/assets/fonts/Oxanium-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "~@gdapps-studio/assets/fonts/Oxanium-SemiBold.ttf",
//       weight: "600",
//       style: "semibold",
//     },
//     {
//       path: "~@gdapps-studio/assets/fonts/Oxanium-Bold.ttf",
//       weight: "700",
//       style: "bold",
//     },
//   ],
// });

// const poppinsFont = localFont({
//   variable: "--font-poppins",
//   src: [
//     {
//       path: "~@gdapps-studio/assets/fonts/Poppins-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "~@gdapps-studio/assets/fonts/Poppins-SemiBold.ttf",
//       weight: "600",
//       style: "semibold",
//     },
//     {
//       path: "~@gdapps-studio/assets/fonts/Poppins-Bold.ttf",
//       weight: "700",
//       style: "bold",
//     },
//   ],
// });

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
      <body
        className={`antialiased`}
        // className={`antialiased ${oxaniumFont.variable} ${poppinsFont.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
