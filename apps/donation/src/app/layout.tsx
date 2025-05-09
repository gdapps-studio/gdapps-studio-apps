import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@gdapps-studio/ui/sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Donation GDapps",
  description:
    "A Next.js SPA for on-chain donations. Built by GDapps Studio, creators of open-source libraries for Ethereum and Solana ecosystems. Our tools include the Merkle Tree Generator and Solana React Hooks. We're committed to building more developer tools for the crypto ecosystem.",
  keywords: [
    "donation",
    "blockchain",
    "ethereum",
    "solana",
    "crypto",
    "web3",
    "merkle tree",
    "react hooks",
    "gdapps",
    "on-chain",
    "developer tools",
    "open source",
    "nextjs",
    "spa",
  ],
  authors: [{ name: "GDapps Studio" }],
  creator: "GDapps Studio",
  publisher: "GDapps Studio",
  openGraph: {
    title: "Donation GDapps",
    description:
      "A Next.js SPA for on-chain donations. Built by GDapps Studio, creators of open-source libraries for Ethereum and Solana ecosystems.",
    url: "https://donation.gdapps.studio",
    siteName: "Donation GDapps",
    images: [
      {
        url: "https://donation.gdapps.studio/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Donation GDapps",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donation GDapps",
    description:
      "A Next.js SPA for on-chain donations. Built by GDapps Studio, creators of open-source libraries for Ethereum and Solana ecosystems.",
    images: ["https://donation.gdapps.studio/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://donation.gdapps.studio",
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
