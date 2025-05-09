import { z } from "zod";
import { CurrencyUninon } from "./currency";

export const chainEthLiteral = z.literal("ethereum");
export const chainSolLiteral = z.literal("solana");
export const chainUnion = z.union([chainEthLiteral, chainSolLiteral]);
export type ChainUnion = z.infer<typeof chainUnion>;

const DEV_ETH_ADDRESS = "0x964cbFD1B733CDd6ee6Cd6014ae96e96e3bE324f";
const DEV_SOL_ADDRESS = "7cbGX6WKXakVrDLpGWM4b9M29YbUqToEcyWu3VitmZQS";

export const chainToPlaceholder: Record<ChainUnion, string> = {
  ethereum: DEV_ETH_ADDRESS,
  solana: DEV_SOL_ADDRESS,
};

export const supportedChains: ChainUnion[] = ["ethereum", "solana"];

export const chainToImageSrc: Record<ChainUnion, string> = {
  ethereum: "/ethereum.webp",
  solana: "/solana.webp",
};

export const chainToDefaultCurrency: Record<ChainUnion, CurrencyUninon> = {
  ethereum: "eth",
  solana: "sol",
};
