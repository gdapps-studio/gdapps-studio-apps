import {
  UseAccount,
  UseBalance,
  UseConnectModal,
  UseTransaction,
} from "./hooks.type";
import { useSendTransaction, useAccount as useWagmiAccount } from "wagmi";
import { useConnectModal as useRainbowConnectModal } from "@rainbow-me/rainbowkit";
import { Address, parseEther } from "viem";

export const useBalance: UseBalance = () => {
  return {
    data: {
      balance: 0,
    },
    isPending: false,
  };
};

export const useMetadata = () => {
  return {
    data: {} as any,
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
