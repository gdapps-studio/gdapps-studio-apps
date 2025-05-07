"use client";
import { chainToImageSrc } from "@/constants";
import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { useCoingeckoPriceInUsd } from "@/hooks/use-coingecko-priceIn-usd";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { PaymentCard } from "@gdapps-studio/payment-card";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const PaymentCardHeader = dynamic(
  () => import("./_components/payment-card-header"),
  {
    ssr: false,
  }
);

const PayPage = () => {
  const {
    address: recipientAddress = "",
    amount,
    chain,
    currency,
    isPaymentRequestParamsValid,
  } = useExtractSearchParams();

  const { useAccount, useConnectModal, useTransaction } = useBlockchainHooks();
  const { openConnectModal } = useConnectModal();

  const { data: account } = useAccount();
  const { isConnected } = account ?? {};

  const { mutate: sendTransaction } = useTransaction();

  const { data: currencyPriceInUsd = 0, isPending: priceLoading } =
    useCoingeckoPriceInUsd({
      id: chain,
      enabled: process.env.NODE_ENV !== "development",
    });

  const onPayment = () => {
    sendTransaction({
      to: recipientAddress,
      value: amount,
    });
  };

  return (
    <div className="flex flex-col pt-44 justify-center items-center mx-auto">
      <PaymentCardHeader chain={chain} />
      {isPaymentRequestParamsValid ? (
        <>
          <div className="w-full max-w-xl mx-auto">
            <PaymentCard
              chainLogoSrc={chainToImageSrc[chain]}
              amount={amount}
              priceLoading={priceLoading}
              reciepientAddress={recipientAddress}
              currency={currency}
              chain={chain}
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
        </>
      ) : (
        <h1>Invalid parameters</h1>
      )}
    </div>
  );
};

export default PayPage;
