import { Button } from "@gdapps-studio/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@gdapps-studio/ui/card";
import { AmountInTokenAndUsd } from "./amount-in-token-and-usd";
import { CardRow } from "./card-row";
import Image from "next/image";

export const truncateAddress = (address: string, length = 4) =>
  `${address.slice(0, length)}...${address.slice(-length)}`;

const GDAPPS_STUDIO_ADDRESSES = [
  "0x964cbFD1B733CDd6ee6Cd6014ae96e96e3bE324f",
  "7cbGX6WKXakVrDLpGWM4b9M29YbUqToEcyWu3VitmZQS",
];

export const PaymentCard = ({
  chainLogoSrc = "",
  isConnected = false,
  currencyPriceInUsd = 0,
  priceLoading = false,
  reciepientAddress = "",
  amount = "0",
  currency = "eth",
  chain = "ethereum",
  onPayment,
  onConnect,
  onCopy,
}: {
  chainLogoSrc: string | undefined;
  isConnected: boolean | undefined;
  currencyPriceInUsd: number | undefined;
  priceLoading: boolean | undefined;
  reciepientAddress: string | undefined;
  amount: string | undefined;
  currency: string | undefined;
  chain: string | undefined;
  onPayment?: () => void;
  onConnect?: () => void;
  onCopy?: () => void;
}) => {
  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    return `Pay ${amount} ${currency.toUpperCase()}`;
  };

  const isGDappsCard = GDAPPS_STUDIO_ADDRESSES.includes(reciepientAddress);
  return (
    <Card
      scaleOnHover={false}
      className="w-full max-w-xs md:max-w-xl mx-auto px-6 py-4 md:px-12 md:py-10"
    >
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
                    src={chainLogoSrc}
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
                  amount={amount}
                  currency={currency}
                  priceLoading={priceLoading}
                  amountInUsd={currencyPriceInUsd * Number(amount)}
                />
              }
              label={"Amount To Pay"}
            />

            <CardRow
              value={
                <button onClick={onCopy} className="underline cursor-pointer">
                  {isGDappsCard ? (
                    <span>GDApps Studio</span>
                  ) : (
                    truncateAddress(reciepientAddress, 8)
                  )}
                </button>
              }
              label={"Payee"}
            />
          </div>

          <Button
            className="w-full mx-auto"
            type="button"
            size="lg"
            onClick={isConnected ? onPayment : onConnect}
          >
            {getButtonText()}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
