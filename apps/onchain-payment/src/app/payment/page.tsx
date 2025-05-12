"use client";
import { chainToImageSrc } from "@/constants";
import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { useCoingeckoPriceInUsd } from "@/hooks/use-coingecko-priceIn-usd";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { PaymentCard, truncateAddress } from "@gdapps-studio/payment-card";
import { successToast } from "@gdapps-studio/ui/sonner";
import dynamic from "next/dynamic";

const PaymentCardHeader = dynamic(
  () => import("./_components/payment-card-header"),
  {
    ssr: false,
  },
);

const PayPage = () => {
  const {
    address: recipientAddress = "",
    amount,
    chain,
    currency,
    isPaymentRequestParamsValid,
  } = useExtractSearchParams();

  const { useAccount, useConnectModal, useTransaction } = useBlockchainHooks({
    chain,
  });
  const { openConnectModal } = useConnectModal();

  const { data: account } = useAccount();
  const { isConnected, address } = account ?? {};

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

  const isUserSendingToSelf = recipientAddress === address;

  return (
    <div className="mx-auto flex flex-col items-center justify-center pt-44">
      <PaymentCardHeader chain={chain} />
      {isPaymentRequestParamsValid ? (
        <>
          <div className="mx-auto w-full max-w-xl space-y-2">
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
                  successToast({
                    title: "Address copied",
                    description: `Copied ${truncateAddress(recipientAddress)} to clipboard`,
                  });
                })
              }
            />
            {isUserSendingToSelf ? (
              <span className="text-sm text-amber-300">
                Warning: you are sending funds to your own address
              </span>
            ) : null}
          </div>
        </>
      ) : (
        <h1>Invalid parameters</h1>
      )}
    </div>
  );
};

export default PayPage;
