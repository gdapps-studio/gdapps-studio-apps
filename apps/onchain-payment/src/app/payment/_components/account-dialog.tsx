import { Button } from "@gdapps-studio/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@gdapps-studio/ui/dialog";
import { Copy, LogOut } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { ChainUnion } from "@/constants";
import { CircleChainLogo } from "./circle-chain-logo";
import { truncateAddress } from "@gdapps-studio/payment-card";

const AccountDialogButton = ({
  icon,
  label,
  ...rest
}: ComponentPropsWithoutRef<"button"> & {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Button
      {...rest}
      size={"lg"}
      className="flex flex-col justify-center gap-2 min-w-1/2 items-center rounded-xl"
    >
      {icon}
      <span className="text-xs font-medium whitespace-nowrap">{label}</span>
    </Button>
  );
};

const EmptyFullRoundCircle = () => (
  <div className="size-20 mx-auto bg-linear-to-r from-primary to-primary/80 rounded-full" />
);

export const AccountDialog = ({
  isAccountModalOpen,
  setIsAccountModalOpen,
  address,
  balance,
  onDisconnect,
  onCopyAddress,
  chain = "ethereum",
}: {
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (isOpen: boolean) => void;
  address: string;
  balance: string;
  onDisconnect?: () => void;
  onCopyAddress?: () => void;
  chain: ChainUnion;
}) => {
  return (
    <Dialog onOpenChange={setIsAccountModalOpen} open={isAccountModalOpen}>
      <DialogContent className="sm:max-w-sm p-6">
        <DialogTitle className="text-center">
          <EmptyFullRoundCircle />
        </DialogTitle>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1.5 text-lg font-bold">
            <CircleChainLogo chain={chain} />
            <span>{truncateAddress(address)}</span>
          </div>

          <span className="text-sm text-foreground/80 font-medium">
            {balance}
          </span>
        </div>
        <div className="max-w-sm w-full mx-auto flex justify-center gap-2">
          <AccountDialogButton
            onClick={onCopyAddress}
            icon={<Copy />}
            label="Copy Address"
          />
          <AccountDialogButton
            onClick={onDisconnect}
            icon={<LogOut />}
            label="Disconnect"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
