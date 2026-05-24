import { ChainUnion } from "./chain";
import {
  CurrencyUninon,
  ethCurrencyValues,
  solCurrencyValues,
} from "./currency";

export const chainToCurrencies: Record<ChainUnion, CurrencyUninon[]> = {
  ethereum: ethCurrencyValues,
  solana: solCurrencyValues,
};

export * from "./rainbow-kit";
export * from "./chain";
export * from "./currency";
export * from "./quick-node";
export * from "./global";
