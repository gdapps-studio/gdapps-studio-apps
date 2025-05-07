import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function PaymentCardHeader({
  chain = "ethereum",
}: {
  chain: string | undefined;
}) {
  return (
    <header className="container w-full fixed top-5 -translate-x-1/2 left-1/2 max-auto z-50 shadow flex items-center justify-between">
      <div></div>
      <div>
        {chain === "solana" ? (
          <WalletMultiButton />
        ) : (
          <ConnectButton chainStatus={"icon"} />
        )}
      </div>
    </header>
  );
}
