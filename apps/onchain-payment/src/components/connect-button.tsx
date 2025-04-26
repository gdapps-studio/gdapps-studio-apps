import { Button } from "@gdapps-studio/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const RainbowConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    size={"lg"}
                    className="w-full"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  onClick={openChainModal}
                  type="button"
                  className="w-full flex items-center"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                      }}
                      className="size-4 block rounded-full overflow-hidden"
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          className="block size-4"
                        />
                      )}
                    </div>
                  )}
                  <span className="block">{chain.name}</span>
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
