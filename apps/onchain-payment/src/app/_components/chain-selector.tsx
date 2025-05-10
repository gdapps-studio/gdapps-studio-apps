import { chainToImageSrc, ChainUnion, supportedChains } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

export const ChainSelector = ({
  onSelected,
  selectedChain,
}: {
  onSelected: (chain: ChainUnion) => void;
  selectedChain: ChainUnion;
}) => (
  <div className="flex w-full gap-2">
    {supportedChains.map((chain) => {
      const isSelected = chain === selectedChain;
      return (
        <button
          key={chain}
          className={clsx(
            `focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3`,
            {
              "bg-transprent": !isSelected,
              "bg-primary": isSelected,
            },
          )}
          onClick={() => onSelected(chain)}
        >
          <Image
            src={chainToImageSrc[chain]}
            width={24}
            height={24}
            alt={`${chain} chain logo`}
          />
          <span className="capitalize">{chain}</span>
        </button>
      );
    })}
  </div>
);
