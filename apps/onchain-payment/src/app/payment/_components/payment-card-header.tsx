import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { useState } from "react";

import { toast } from "sonner";
import { ChainUnion } from "@/constants";
import { AccountDialog } from "./account-dialog";
import { CircleChainLogo } from "./circle-chain-logo";
import { ConnectedButtonContent } from "./connected-button-content";
import { successToast } from "@gdapps-studio/ui/sonner";
import { truncateAddress } from "@gdapps-studio/payment-card";

const DEFAULT_ZERO_VALUE = 0;

export default function PaymentCardHeader({
  chain = "ethereum",
}: {
  chain: ChainUnion | undefined;
}) {
  const {
    useAccount,
    useBalance,
    useNativeCurrencyMetadata,
    useDisconnect,
    useConnectModal,
  } = useBlockchainHooks();
  const { data: metadata } = useNativeCurrencyMetadata();
  const { openConnectModal } = useConnectModal();

  const { symbol = "" } = metadata ?? {};
  const { data: account } = useAccount();
  const { data: { balance } = {} } = useBalance();
  const { isConnected = false, address = "" } = account ?? {};
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const disconnect = useDisconnect();

  return (
    <header className="max-auto fixed top-5 left-1/2 z-50 container flex -translate-x-1/2 items-center justify-between shadow">
      <div></div>
      <div>
        <button
          onClick={() => {
            if (!isConnected) openConnectModal?.();
            else setIsAccountModalOpen(true);
          }}
        >
          {isConnected ? (
            <ConnectedButtonContent
              address={address}
              balance={balance ?? DEFAULT_ZERO_VALUE}
              chain={chain}
              symbol={symbol}
            />
          ) : (
            <div className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 font-semibold">
              <span className="font-semibold">Connect Wallet</span>
              <CircleChainLogo chain={chain} size={20} />
            </div>
          )}
        </button>
      </div>
      <AccountDialog
        chain={chain}
        isAccountModalOpen={isAccountModalOpen}
        setIsAccountModalOpen={setIsAccountModalOpen}
        address={address}
        balance={`${balance} ${symbol}`}
        onDisconnect={() => {
          disconnect();
          setIsAccountModalOpen(false);
        }}
        onCopyAddress={() => {
          navigator.clipboard
            .writeText(address)
            .then(() =>
              successToast({
                title: "Address copied",
                description: `Copied ${truncateAddress(address)} to the clipboard`,
              }),
            )
            .catch(() => toast.error("Failed to copy address"));
        }}
      />
    </header>
  );
}

// 1. not connected state
// 2. connected state
// 3. connected modal
