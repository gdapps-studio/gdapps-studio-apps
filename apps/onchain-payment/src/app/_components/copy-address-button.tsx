import { ComponentPropsWithoutRef } from "react";
import { toast } from "sonner";

export const CopyAddressButton = ({
  onAbort,
  displayText,
  copyText = "",
  successMessage = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  displayText?: string;
  copyText?: string;
  successMessage?: string;
}) => (
  <button
    {...props}
    className="underline cursor-pointer"
    onClick={() =>
      navigator.clipboard.writeText(copyText).then(() => {
        toast.success(successMessage);
      })
    }
  >
    {displayText}
  </button>
);
