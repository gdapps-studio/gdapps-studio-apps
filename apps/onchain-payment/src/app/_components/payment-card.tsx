import { Button } from "@gdapps-studio/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@gdapps-studio/ui/card";
import { useCoingeckoPriceInUsd } from "@/hooks/use-coingecko-priceIn-usd";
import { truncateAddress } from "@/utils/truncate-address";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { useBlockchainHooks } from "@/hooks/use-blockchain-hooks";
import { CopyAddressButton } from "./copy-address-button";
import { AmountInTokenAndUsd } from "./amount-in-token-and-usd";
import { CardRow } from "./card-row";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { chainToImageSrc } from "@/constants";

const PaymentCardHeader = () => {
  const { chain } = useExtractSearchParams();

  return (
    <header className="container w-full fixed top-0 left-1/2 -translate-x-1/2 z-50 shadow px-4 py-6 flex items-center justify-between">
      <div></div>
      <div>
        {chain === "solana" ? (
          <WalletMultiButton />
        ) : (
          <ConnectButton chainStatus={"icon"} />
        )}
      </div>
    </header>
  );
};

export const PaymentCard = () => {
  const blockchainHooks = useBlockchainHooks();
  const {
    address: recipientAddress = "",
    amount,
    chain,
    currency,
  } = useExtractSearchParams();

  const { useAccount, useConnectModal, useTransaction } = blockchainHooks;
  const { openConnectModal } = useConnectModal();
  const { data: account } = useAccount();

  const { isConnected } = account ?? {};
  console.log("isConnected", isConnected);

  const { data: currencyPriceInUsd = 0, isPending: priceLoading } =
    useCoingeckoPriceInUsd({
      id: chain,
      enabled: process.env.NODE_ENV !== "development",
    });

  const { mutate: useSendTransaction } = useTransaction();

  const handlePayment = () => {
    useSendTransaction({
      to: recipientAddress,
      value: amount,
    });
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    return `Pay ${amount} ${currency.toUpperCase()}`;
  };

  return (
    <Card
      scaleOnHover={false}
      className="w-full max-w-xs md:max-w-xl mx-auto px-6 py-4 md:px-12 md:py-10"
    >
      <PaymentCardHeader />

      <div className="space-y-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Payment Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <CardRow
              value={
                <div className="flex items-center gap-1">
                  <Image
                    src={chainToImageSrc[chain]}
                    width={24}
                    height={24}
                    alt={`${chain} chain logo`}
                  />
                  <span className="capitalize">{chain}</span>
                </div>
              }
              label={"Chain"}
            />
            <CardRow
              value={
                <AmountInTokenAndUsd
                  priceLoading={priceLoading}
                  amountInUsd={currencyPriceInUsd * Number(amount)}
                />
              }
              label={"Amount To Pay"}
            />

            <CardRow
              value={
                <CopyAddressButton
                  displayText={truncateAddress(recipientAddress, 8)}
                  copyText={recipientAddress}
                  successMessage="Address Copied"
                />
              }
              label={"Payee"}
            />
          </div>

          <Button
            className="w-full mx-auto"
            type="button"
            size="lg"
            onClick={isConnected ? handlePayment : openConnectModal}
          >
            {getButtonText()}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
