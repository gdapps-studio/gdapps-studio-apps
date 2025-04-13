import React from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { env } from "@/env.mjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@gdapps-studio/ui/button";
import { copyAddress } from "../_utils/copy-address";

const AddressAndCopy = ({
  donationAddress,
  ...props
}: React.ComponentProps<"button"> & { donationAddress: string }) => {
  return (
    <div className="flex items-center space-x-2 bg-secondary p-3 rounded-lg">
      <code className="flex-1 text-sm break-all">{donationAddress}</code>
      <Button variant="ghost" size="icon" title="Copy address" {...props}>
        <ClipboardDocumentIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy me a coffee</DialogTitle>
          <DialogDescription>
            If you find this tool useful, consider buying me a coffee. I take
            testnet funds as well 🤝
          </DialogDescription>
        </DialogHeader>
        {[
          env.NEXT_PUBLIC_DONATION_ETH_ADDRESS,
          env.NEXT_PUBLIC_DONATION_SOL_ADDRESS,
        ].map((addr) => {
          return (
            <AddressAndCopy
              key={addr}
              donationAddress={addr}
              onClick={() => {
                copyAddress({
                  address: addr,
                });
              }}
            />
          );
        })}

        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Maybe later
          </Button>
          <Button type="button" onClick={onConfirm}>
            Will do
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
