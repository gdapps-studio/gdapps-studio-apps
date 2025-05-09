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

export const useBlockchainHooks = ({ chain }: { chain: ChainUnion }) => {
  return blockchainHooks[chain];
};
