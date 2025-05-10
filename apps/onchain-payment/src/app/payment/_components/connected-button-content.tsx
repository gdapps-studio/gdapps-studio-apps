import { ChainUnion } from "@/constants";
import { roundDownIfExceedsDecimals } from "@/utils/number";
import { truncateAddress } from "@gdapps-studio/payment-card";
import { CircleChainLogo } from "./circle-chain-logo";
import { ChevronDown } from "lucide-react";

const DEFAULT_ROUND_DOWN_DECIMALS = 4;

const BalanceAndSymbol = ({
  balance,
  symbol,
}: {
  balance: number;
  symbol: string;
}) => (
  <div className="rounded-tl-lg rounded-bl-lg relative left-1 bg-primary/50 font-semibold flex items-center gap-1 p-2 px-4">
    <span>
      {roundDownIfExceedsDecimals(balance, DEFAULT_ROUND_DOWN_DECIMALS)}
    </span>
    <span>{symbol}</span>
  </div>
);

const CHAIN_LOGO_SIZE = 16;

const ChainAndAddress = ({
  address,
  chain,
}: {
  chain: ChainUnion;
  address: string;
}) => (
  <div className="rounded-lg bg-primary flex items-center gap-1 p-2 font-semibold">
    <CircleChainLogo chain={chain} size={CHAIN_LOGO_SIZE} />
    <span>{truncateAddress(address)}</span>
    <ChevronDown className="size-5 font-semibold" />
  </div>
);

export const ConnectedButtonContent = ({
  address,
  balance = 0,
  symbol,
  chain,
}: {
  balance: number;
  symbol: string;
  chain: ChainUnion;
  address: string;
}) => (
  <div className="flex items-center">
    <BalanceAndSymbol balance={balance} symbol={symbol} />
    <ChainAndAddress address={address} chain={chain} />
  </div>
);
