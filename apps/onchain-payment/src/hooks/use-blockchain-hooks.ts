import {
  UseAccount,
  UseBalance,
  UseConnectModal,
  UseDisconnect,
  UseNativeCurrencyMetadata,
  UseTransaction,
} from "../hooks/blockchain-hooks/hooks.type";
import * as ethereumHooks from "../hooks/blockchain-hooks/ethereum";
import * as solanaHooks from "../hooks/blockchain-hooks/solana";
import { ChainUnion } from "../constants";

interface Hooks {
  useBalance: UseBalance;
  useNativeCurrencyMetadata: UseNativeCurrencyMetadata;
  useAccount: UseAccount;
  useTransaction: UseTransaction;
  useConnectModal: UseConnectModal;
  useDisconnect: UseDisconnect;
}

export const blockchainHooks: Record<ChainUnion, Hooks> = {
  ethereum: { ...ethereumHooks },
  solana: { ...solanaHooks },
};

export const useEthereumHooks = () => {
  return { ...blockchainHooks.ethereum };
};

export const useSolanaHooks = () => {
  return { ...blockchainHooks.solana };
};

export const useBlockchainHooks = ({ chain }: { chain: ChainUnion }) => {
  return { ...blockchainHooks[chain] };
};
