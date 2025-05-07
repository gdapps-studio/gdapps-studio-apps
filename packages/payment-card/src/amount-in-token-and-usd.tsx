import { LoadingSpinner } from "@gdapps-studio/ui/loading-spinner";

export const AmountInTokenAndUsd = ({
  amountInUsd,
  priceLoading,
  amount = "0",
  currency = "eth",
}: {
  priceLoading: boolean;
  amountInUsd: number;
  amount: string | undefined;
  currency: string | undefined;
}) => {
  return (
    <div className="relative flex items-center gap-2">
      <span>
        {amount} {currency.toUpperCase()}
      </span>
      {priceLoading ? <LoadingSpinner /> : `($${amountInUsd.toFixed(2)})`}
    </div>
  );
};
