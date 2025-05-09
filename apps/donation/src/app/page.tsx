"use client";

import { PaymentCard } from "@gdapps-studio/payment-card";
import { chainToImageSrc, ChainUnion, CurrencyUninon } from "@/constants";
import { toast } from "sonner";
import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { useCoingeckoPriceInUsd } from "@/hooks/use-coingecko-priceIn-usd";
import { useSearchParams } from "next/navigation";

type Config = {
  recipientAddress: string;
  chain: ChainUnion;
};

const config: Record<CurrencyUninon, Config> = {
  eth: {
    recipientAddress: "0x964cbFD1B733CDd6ee6Cd6014ae96e96e3bE324f",
    chain: "ethereum",
  },
  sol: {
    recipientAddress: "7cbGX6WKXakVrDLpGWM4b9M29YbUqToEcyWu3VitmZQS",
    chain: "solana",
  },
};

const CURRENCY = "eth" as CurrencyUninon;
const CHAIN = "ethereum" as ChainUnion;
const AMOUNT = "0.01";

export default function Home() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const { useAccount, useConnectModal, useTransaction } = useBlockchainHooks({
    chain: CHAIN,
  });

  const { openConnectModal } = useConnectModal();

  const { data: account } = useAccount();
  const { isConnected } = account ?? {};

  const { mutate: sendTransaction } = useTransaction();

  const { data: currencyPriceInUsd = 0, isPending: priceLoading } =
    useCoingeckoPriceInUsd({
      id: CHAIN,
      enabled: process.env.NODE_ENV !== "development",
    });

  const { recipientAddress } = config[CURRENCY];

  const actualAmount = amount ?? AMOUNT;

  const onPayment = () => {
    sendTransaction({
      to: recipientAddress,
      value: actualAmount,
    });
  };

  return (
    <div className="flex flex-col pt-44 justify-center items-center mx-auto">
      <div className="w-full max-w-xl mx-auto space-y-5">
        <PaymentCard
          chainLogoSrc={chainToImageSrc[CHAIN]}
          amount={actualAmount}
          priceLoading={priceLoading}
          reciepientAddress={recipientAddress}
          currency={CURRENCY}
          chain={CHAIN}
          isConnected={isConnected}
          currencyPriceInUsd={currencyPriceInUsd}
          onConnect={openConnectModal}
          onPayment={onPayment}
          onCopy={() =>
            navigator.clipboard.writeText(recipientAddress).then(() => {
              toast.success("Address Copied");
            })
          }
        />
      </div>
    </div>
  );
}
