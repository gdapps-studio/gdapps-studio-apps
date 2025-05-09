import {
  ChainUnion,
  CurrencyUninon,
  chainToCurrencies,
  currencyToImageSrc,
} from "@/constants";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@gdapps-studio/ui/select";

import Image from "next/image";

export const CurrencySelect = ({
  selectedCurrency,
  setSelectedCurrency,
  selectedChain,
}: {
  selectedCurrency: CurrencyUninon;
  setSelectedCurrency: (currency: CurrencyUninon) => void;
  selectedChain: ChainUnion;
}) => {
  return (
    <Select
      onValueChange={(value: CurrencyUninon) => {
        setSelectedCurrency(value);
      }}
      defaultValue={selectedCurrency}
    >
      <SelectTrigger className="w-full h-10">
        <div className="flex items-center gap-1">
          <Image
            src={currencyToImageSrc[selectedCurrency]}
            width={24}
            height={24}
            alt={`${selectedCurrency} currency logo`}
          />
          <span className="uppercase">{selectedCurrency}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {chainToCurrencies[selectedChain].map((currency) => (
            <SelectItem className="capitalize" key={currency} value={currency}>
              <div className="flex items-center gap-1">
                <Image
                  src={currencyToImageSrc[currency]}
                  width={24}
                  height={24}
                  alt={`${currency} chain logo`}
                />
                <span className="uppercase">{currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
