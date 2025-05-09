import { ChainUnion } from "@/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function PaymentCardHeader({
  chain = "ethereum",
}: {
  chain: ChainUnion | undefined;
}) {
  // const [selectedCurrency] = useState<ChainUnion>(chain);
  return (
    <header className="container w-full fixed top-5 -translate-x-1/2 left-1/2 max-auto z-50 shadow flex items-center justify-between">
      <div></div>
      <div className="flex items-center gap-2">
        {chain === "solana" ? (
          <WalletMultiButton />
        ) : (
          <ConnectButton chainStatus={"icon"} />
        )}
      </div>
    </header>
  );
}
