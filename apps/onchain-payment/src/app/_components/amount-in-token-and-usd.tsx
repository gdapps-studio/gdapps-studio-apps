import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { LoadingSpinner } from "@gdapps-studio/ui/loading-spinner";

export const AmountInTokenAndUsd = ({
  amountInUsd,
  priceLoading,
}: {
  priceLoading: boolean;
  amountInUsd: number;
}) => {
  const { amount, currency } = useExtractSearchParams();
  return (
    <div className="relative flex items-center gap-2">
      <span>
        {amount} {currency.toUpperCase()}
      </span>
      {priceLoading ? <LoadingSpinner /> : `($${amountInUsd.toFixed(2)})`}
    </div>
  );
};
