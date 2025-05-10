import {
  UseAccount,
  UseBalance,
  UseConnectModal,
  UseDisconnect,
  UseNativeCurrencyMetadata,
  UseTransaction,
} from "./hooks.type";
import {
  useSendTransaction,
  useAccount as useWagmiAccount,
  useDisconnect as useDisconnectWagmi,
  useBalance as useWagmiBalance,
} from "wagmi";
import { useConnectModal as useRainbowConnectModal } from "@rainbow-me/rainbowkit";
import { Address, formatUnits, parseEther } from "viem";

export const useBalance: UseBalance = () => {
  const { address } = useWagmiAccount();

  const { data: balance } = useWagmiBalance({
    address,
  });
  const { value = 0n, decimals = 18 } = balance || {};
  return {
    data: {
      balance: +formatUnits(value, decimals),
    },
    isPending: false,
  };
};

export const useNativeCurrencyMetadata: UseNativeCurrencyMetadata = () => {
  return {
    data: {
      symbol: "ETH",
    },
    isPending: false,
  };
};

export const useAccount: UseAccount = () => {
  const { isConnected = false, address = "" } = useWagmiAccount();

  return {
    data: {
      isConnected,
      address,
    },
    isPending: false,
  };
};

export const useTransaction: UseTransaction = () => {
  const { sendTransaction } = useSendTransaction();
  return {
    mutate: ({ to: recipientAddress, value }) => {
      sendTransaction({
        to: recipientAddress as Address,
        value: parseEther(value.toString()),
      });
    },
    isPending: false,
  };
};

export const useConnectModal: UseConnectModal = () => {
  const { openConnectModal } = useRainbowConnectModal();
  return {
    openConnectModal: () => {
      openConnectModal?.();
    },
  };
};

export const useDisconnect: UseDisconnect = () => {
  const { disconnect } = useDisconnectWagmi();
  return () => {
    disconnect();
  };
};
