"use client";
import {
  chainToImageSrc,
  currencyToImageSrc,
  isDevelopment,
} from "@/constants";
import { useSimulateUsdcTransfer } from "@/generated";
import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { useCoingeckoPriceInUsd } from "@/hooks/use-coingecko-priceIn-usd";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { PaymentCard, truncateAddress } from "@gdapps-studio/payment-card";
import { successToast } from "@gdapps-studio/ui/sonner";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Address, parseUnits, SimulateContractErrorType } from "viem";
import { Loader2 } from "lucide-react";
const PaymentCardHeader = dynamic(
  () => import("./_components/payment-card-header"),
  {
    ssr: false,
  },
);

const LoadingText = ({ text }: { text: string | undefined }) => (
  <span className="flex items-center gap-x-2 text-sm">
    <span>{text}</span>
    <Loader2 className="size-4 animate-spin" />
  </span>
);

const SimulateTokenTransfer = ({
  amount,
  recipientAddress,
}: {
  recipientAddress: Address;
  amount: string;
}) => {
  const {
    data: result,
    error,
    isPending: isTokenTransferSimulatePending,
    isError,
  } = useSimulateUsdcTransfer({
    args: [recipientAddress as Address, parseUnits(amount, 6)],
  });

  const getError = (error: SimulateContractErrorType) => {
    if (error.message.match(/transfer amount exceeds balance/))
      return "Your transaction is high likely to fail due to insufficient funds.";
    return "Failed without indentifying a reason";
  };

  return isTokenTransferSimulatePending ? (
    <LoadingText text="Simulating transaction" />
  ) : isError ? (
    <Error>{getError(error as SimulateContractErrorType)}</Error>
  ) : result?.request.gasPrice ? (
    <Success>
      {`Transaction simulation succeeded: ${result?.request.gasPrice} gwei`}
    </Success>
  ) : null;
};

const PayPage = () => {
  const {
    address: recipientAddress = "",
    amount,
    chain,
    currency,
    isPaymentRequestParamsValid,
    isNativeCurrency,
  } = useExtractSearchParams();

  const {
    useAccount,
    useConnectModal,
    useTransaction,
    useTokenBalance,
    useTokenTransfer,
    useBalance,
  } = useBlockchainHooks({
    chain: chain,
  });
  const { openConnectModal } = useConnectModal();

  const { data: account } = useAccount();
  const { isConnected, address } = account ?? {};

  const { mutate: sendTransaction } = useTransaction();
  const { mutate: tokenTransfer } = useTokenTransfer();

  const { data: { balance: tokenBalance = 0 } = {} } = useTokenBalance();
  const { data: { balance: nativeBalance = 0 } = {} } = useBalance();

  const balance = isNativeCurrency ? nativeBalance : tokenBalance;

  const { data: currencyPriceInUsd = 0, isPending: priceLoading } =
    useCoingeckoPriceInUsd({
      id: chain,
      enabled: !isDevelopment,
    });

  const onPayment = () => {
    if (isNativeCurrency) {
      sendTransaction({
        to: recipientAddress,
        value: amount,
      });
    } else {
      tokenTransfer({
        amount,
        recipient: recipientAddress,
      });
    }
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
              currencyLogoSrc={currencyToImageSrc[currency]}
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
            <ul className="flex flex-col gap-y-1">
              {chain === "ethereum" && !isNativeCurrency ? (
                <SimulateTokenTransfer
                  recipientAddress={recipientAddress as Address}
                  amount={amount}
                />
              ) : null}
              {isUserSendingToSelf ? (
                <Warning>You are sending funds to your own address</Warning>
              ) : null}
            </ul>
          </div>
        </>
      ) : (
        <h1>Invalid parameters</h1>
      )}
    </div>
  );
};

const Warning = ({ children }: { children: ReactNode }) => (
  <li className="text-sm text-amber-300">Warning: {children}</li>
);

const Error = ({ children }: { children: ReactNode }) => (
  <li className="text-sm text-red-300">Error: {children}</li>
);

const Success = ({ children }: { children: ReactNode }) => (
  <li className="text-sm text-green-300">Success: {children}</li>
);

export default PayPage;
