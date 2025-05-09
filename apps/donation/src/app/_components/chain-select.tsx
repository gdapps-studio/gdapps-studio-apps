import { ChainUnion, chainToImageSrc, supportedChains } from "@/constants";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@gdapps-studio/ui/select";

import Image from "next/image";
export const ChainSelect = ({
  selectedChain,
  setSelectedChain,
}: {
  selectedChain: ChainUnion;
  setSelectedChain: (chain: ChainUnion) => void;
}) => {
  return (
    <Select
      onValueChange={(value: ChainUnion) => {
        setSelectedChain(value);
      }}
      defaultValue={selectedChain}
    >
      <SelectTrigger className="w-full h-10">
        <div className="flex items-center gap-1">
          <Image
            src={chainToImageSrc[selectedChain]}
            width={24}
            height={24}
            alt={`${selectedChain} chain logo`}
          />
          <span className="capitalize">{selectedChain}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {supportedChains.map((chain) => (
            <SelectItem className="capitalize" key={chain} value={chain}>
              <div className="flex items-center gap-1">
                <Image
                  src={chainToImageSrc[chain]}
                  width={24}
                  height={24}
                  alt={`${chain} chain logo`}
                />
                <span className="capitalize">{chain}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
