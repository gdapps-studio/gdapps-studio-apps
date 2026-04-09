import {
  UseAccount,
  UseBalance,
  UseConnectModal,
  UseDisconnect,
  UseNativeCurrencyMetadata,
  UseTokenBalance,
  UseTokenTransfer,
  UseTransaction,
} from "./hooks.type";
import {
  useSendTransaction,
  useAccount as useWagmiAccount,
  useDisconnect as useDisconnectWagmi,
  useBalance as useWagmiBalance,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useConnectModal as useRainbowConnectModal } from "@rainbow-me/rainbowkit";
import {
  Address,
  formatUnits,
  isAddress,
  parseEther,
  parseGwei,
  parseUnits,
} from "viem";
import {
  useReadUsdcBalanceOf,
  useReadUsdcDecimals,
  useWriteUsdcTransfer,
} from "@/generated";

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

export const useTokenTransfer: UseTokenTransfer = () => {
  const {
    writeContract: transferUsdc,
    isPending,
    data: hash,
  } = useWriteUsdcTransfer();

  const { data: decimals = 6 } = useReadUsdcDecimals();

  const { isPending: isTransactionReceiptPending } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  return {
    isPending: isTransactionReceiptPending || isPending,
    mutate: async ({ amount, recipient }) => {
      transferUsdc({
        args: [recipient as Address, parseUnits(amount, decimals)],
        gasPrice: parseGwei("0.01"),
      });
    },
  };
};

export const useTokenBalance: UseTokenBalance = () => {
  const { isConnected = false, address = "" } = useWagmiAccount();

  const { data: decimals = 6 } = useReadUsdcDecimals();
  const { data: balance = 0n, isPending } = useReadUsdcBalanceOf({
    args: [address as Address],
    query: {
      enabled: isConnected && isAddress(address),
    },
  });

  return {
    data: {
      balance: +formatUnits(balance, decimals),
    },
    isPending,
  };
};
