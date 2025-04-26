"use client";

import { ReactNode, Suspense, useMemo } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
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
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

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

export const Providers = ({ children }: { children: ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                theme={rainbowKitTheme}
                initialChain={mainnet}
              >
                <Header />
                <Suspense>{children}</Suspense>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
