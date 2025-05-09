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
  UseTransaction,
} from "./hooks.type";
import { parseUnits } from "viem";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export const useBalance: UseBalance = () => {
  return {
    data: {} as any,
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
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      const signedTx = await wallet.signTransaction(transaction);

      const signature = await connection.sendRawTransaction(
        signedTx.serialize()
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
