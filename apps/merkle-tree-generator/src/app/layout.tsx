import type { Metadata } from "next";

import { Toaster } from "@gdapps-studio/ui/sonner";

import "./globals.css";

const TITLE =
  "Merkle Tree Generator | Whitelist Tool for Solana and EVM developers";
const DESCRIPTION =
  "Free online tool to generate Merkle trees for crypto whitelists using OpenZeppelin, svm-merkle-tree libraries. Create proof.json for your smart contract/program whitelist mechanism. Perfect for NFT projects and token sales.";
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Merkle tree generator",
    "whitelist generator",
    "OpenZeppelin Merkle tree",
    "svm-merkle-tree",
    "crypto whitelist tool",
    "smart contract whitelist",
    "proof.json generator",
    "Ethereum whitelist",
    "Solana whitelist",
    "merkle proof generator",
    "web3 whitelist tool",
    "blockchain whitelist",
    "token sale whitelist",
    "NFT whitelist",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Merkle Tree Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={"antialiased"}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
