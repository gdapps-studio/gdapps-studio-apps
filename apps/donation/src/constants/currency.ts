import { z } from "zod";

export const ethCurrencies = z.enum(["eth"]);
export const ethCurrencyValues = Object.values(ethCurrencies.Values);
export type EthereumCurrency = z.infer<typeof ethCurrencies>;
export const solCurrencies = z.enum(["sol"]);
export type SolanaCurrency = z.infer<typeof solCurrencies>;
export const solCurrencyValues = Object.values(solCurrencies.Values);
export const currencyUninon = z.union([ethCurrencies, solCurrencies]);

export type CurrencyUninon = z.infer<typeof currencyUninon>;
export const currencyToImageSrc: Record<CurrencyUninon, string> = {
  eth: "/ethereum.webp",
  // usdc: "/usdc.webp",
  sol: "/solana.webp",
};
