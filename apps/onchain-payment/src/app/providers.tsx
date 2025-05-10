"use client";

import { ReactNode, Suspense, useMemo } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  RAINBOW_KIT_APP_NAME,
  RAINBOW_KIT_BASE_PRC_URL,
  RAINBOW_KIT_PROJECT_ID,
  rainbowKitTheme,
} from "@/constants";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolanaHooksProvider } from "@gio-shara/solana-hooks";

import "@solana/wallet-adapter-react-ui/styles.css";
import { Footer } from "./_components/footer";

const config = getDefaultConfig({
  appName: RAINBOW_KIT_APP_NAME,
  projectId: RAINBOW_KIT_PROJECT_ID,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      `${RAINBOW_KIT_BASE_PRC_URL}/${process.env.NEXT_PUBLIC_INFURA_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

const DEFAULT_SOLANA_NETWORK =
  process.env.NODE_ENV === "development"
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet;
const ENDPOINT = clusterApiUrl(DEFAULT_SOLANA_NETWORK);

const connection = new Connection(ENDPOINT, "confirmed");

export const Providers = ({ children }: { children: ReactNode }) => {
  const endpoint = useMemo(() => ENDPOINT, [DEFAULT_SOLANA_NETWORK]);
  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DEFAULT_SOLANA_NETWORK]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <SolanaHooksProvider config={{ connection }}>
                <RainbowKitProvider
                  theme={rainbowKitTheme}
                  initialChain={mainnet}
                >
                  <div className="h-screen flex flex-col">
                    <div className="flex-1">
                      <Suspense>{children}</Suspense>
                    </div>
                    <Footer />
                  </div>
                </RainbowKitProvider>
              </SolanaHooksProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
