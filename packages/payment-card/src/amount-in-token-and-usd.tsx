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
    <div className="relative flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
      <span>
        {amount} {currency.toUpperCase()}
      </span>

      {priceLoading ? (
        <LoadingSpinner />
      ) : (
        <span className="whitespace-nowrap">(${amountInUsd.toFixed(2)})</span>
      )}
    </div>
  );
};
