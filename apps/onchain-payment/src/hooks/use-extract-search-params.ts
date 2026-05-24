import {
  supportedChains,
  chainToCurrencies,
  ChainUnion,
  CurrencyUninon,
  nativeCurrencies,
} from "../constants";
import { useSearchParams } from "next/navigation";

export const useExtractSearchParams = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";
  const amount = searchParams.get("amount") || "0";
  const chain = (searchParams.get("chain") || "").toLowerCase() as ChainUnion;

  const currency = (
    searchParams.get("currency") || ""
  ).toLowerCase() as CurrencyUninon;
  const isSupportedCurrency = chainToCurrencies[chain]?.includes(currency);

  return {
    address,
    amount,
    chain,
    currency,
    isPaymentRequestParamsValid:
      address.length > 0 &&
      Number(amount) > 0 &&
      supportedChains.includes(chain) &&
      isSupportedCurrency,
    isSupportedChain: supportedChains.includes(chain),
    isNativeCurrency: nativeCurrencies.includes(currency),
  };
};
