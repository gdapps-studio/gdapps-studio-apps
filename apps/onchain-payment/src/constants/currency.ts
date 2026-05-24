import { z } from "zod";

const ETH = "eth";
const SOL = "sol";

export const ethCurrencies = z.enum([ETH, "usdc"]);
export const ethCurrencyValues = Object.values(ethCurrencies.Values);
export type EthereumCurrency = z.infer<typeof ethCurrencies>;
export const solCurrencies = z.enum([SOL]);
export type SolanaCurrency = z.infer<typeof solCurrencies>;
export const solCurrencyValues = Object.values(solCurrencies.Values);
export const currencyUninon = z.union([ethCurrencies, solCurrencies]);

export const nativeCurrencies = [ETH, SOL];

export type CurrencyUninon = z.infer<typeof currencyUninon>;

export const currencyToImageSrc: Record<CurrencyUninon, string> = {
  eth: "/ethereum.webp",
  usdc: "/usdc.webp",
  sol: "/solana.webp",
};

export const currencyToSuffix: Record<CurrencyUninon, string> = {
  eth: " ETH",
  usdc: " USDC",
  sol: " SOL",
};
