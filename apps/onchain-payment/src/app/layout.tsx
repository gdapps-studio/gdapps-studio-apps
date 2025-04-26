import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@gdapps-studio/ui/sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "On Chain Payment | Secure and Easy Crypto Payments",
  description:
    "A secure and efficient infrastructure for requesting and processing cryptocurrency payments on Solana and Ethereum networks.",
  keywords: [
    "crypto payments",
    "ethereum",
    "solana",
    "blockchain payments",
    "crypto transactions",
  ],
  openGraph: {
    title: "On Chain Payment | Secure and Easy Crypto Payments",
    description:
      "A secure and efficient infrastructure for requesting and processing cryptocurrency payments on Solana and Ethereum networks.",
    url: "https://onchainpay.com",
    siteName: "On Chain Payment",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "On Chain Payment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "On Chain Payment | Secure and Easy Crypto Payments",
    description:
      "A secure and efficient infrastructure for requesting and processing cryptocurrency payments on Solana and Ethereum networks.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
