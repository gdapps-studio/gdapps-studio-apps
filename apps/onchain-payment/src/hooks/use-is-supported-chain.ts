import { supportedChains } from "@/constants";
import { useExtractSearchParams } from "./use-extract-search-params";

export const useIsSupportedChain = () => {
  const { chain } = useExtractSearchParams();
  if (!chain) throw new Error("Chain is not defined");
  return supportedChains.includes(chain);
};
