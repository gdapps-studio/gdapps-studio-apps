import {
  UseAccount,
  UseBalance,
  UseConnectModal,
  UseMetadataData,
  UseTransaction,
} from "../hooks/blockchain-hooks/hooks.type";
import * as ethereumHooks from "../hooks/blockchain-hooks/ethereum";
import * as solanaHooks from "../hooks/blockchain-hooks/solana";
import { ChainUnion } from "../constants";
import { useExtractSearchParams } from "./use-extract-search-params";

interface Hooks {
  useBalance: UseBalance;
  useMetadata: UseMetadataData;
  useAccount: UseAccount;
  useTransaction: UseTransaction;
  useConnectModal: UseConnectModal;
}

export const blockchainHooks: Record<ChainUnion, Hooks> = {
  ethereum: { ...ethereumHooks },
  solana: { ...solanaHooks },
};

export const useBlockchainHooks = () => {
  const { chain, isSupportedChain } = useExtractSearchParams();
  if (!isSupportedChain) throw new Error("Chain is not supported");

  return blockchainHooks[chain];
};
