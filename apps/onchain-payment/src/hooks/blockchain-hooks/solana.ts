import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import {
  useWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
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
import { Address, parseUnits } from "viem";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useBalance as useSolanaBalance } from "@gio-shara/solana-hooks";
import { useReadUsdcDecimals, useWriteUsdcTransfer } from "@/generated";
import { useWaitForTransactionReceipt } from "wagmi";

export const useBalance: UseBalance = () => {
  const wallet = useAnchorWallet();

  const { data: balance = 0 } = useSolanaBalance({
    address: wallet?.publicKey ?? "",
  });
  return {
    data: {
      balance: balance / LAMPORTS_PER_SOL,
    },
    isPending: false,
  };
};

export const useNativeCurrencyMetadata: UseNativeCurrencyMetadata = () => {
  return {
    data: {
      symbol: "SOL",
    },
    isPending: false,
  };
};

export const useAccount: UseAccount = () => {
  const { publicKey, connected, connecting, disconnecting } = useWallet();
  return {
    data: {
      address: publicKey?.toString() || "",
      isConnected: connected,
    },
    isPending: connecting || disconnecting,
  };
};

export const useTransaction: UseTransaction = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  return {
    mutate: async ({ to, value }) => {
      if (!wallet) throw new Error("Wallet not connected");

      const lamportsToSend = Number(parseUnits(value, 9));

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: lamportsToSend,
        }),
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      const signedTx = await wallet.signTransaction(transaction);

      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
      );
      await connection.confirmTransaction(signature, "confirmed");
    },
    isPending: false,
  };
};

export const useConnectModal: UseConnectModal = () => {
  const { setVisible } = useWalletModal();
  return {
    openConnectModal: () => {
      setVisible(true);
    },
  };
};

export const useDisconnect: UseDisconnect = () => {
  const { disconnect } = useWallet();

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
      });
    },
  };
};

export const useTokenBalance: UseTokenBalance = () => {
  return {
    data: {} as any,
    isPending: false,
  };
};
