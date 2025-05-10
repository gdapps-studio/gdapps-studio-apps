import {
  chainToCurrencies,
  ChainUnion,
  currencyToImageSrc,
  CurrencyUninon,
} from "@/constants";
import clsx from "clsx";
import Image from "next/image";

export const CurrencySelectorSelector = ({
  onSelected,
  selectedCurrency,
  selectedChain,
}: {
  onSelected: (chain: CurrencyUninon) => void;
  selectedCurrency: CurrencyUninon;
  selectedChain: ChainUnion;
}) => (
  <div className="flex w-full gap-2">
    {chainToCurrencies[selectedChain].map((currency) => {
      const isSelected = currency === selectedCurrency;
      return (
        <button
          key={currency}
          className={clsx(
            `focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3`,
            {
              "bg-transprent": !isSelected,
              "bg-primary": isSelected,
            },
          )}
          onClick={() => onSelected(currency)}
        >
          <Image
            src={currencyToImageSrc[currency]}
            width={24}
            height={24}
            alt={`${currency} currency logo`}
          />
          <span className="uppercase">{currency}</span>
        </button>
      );
    })}
  </div>
);
