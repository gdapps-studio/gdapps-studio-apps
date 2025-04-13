import { Button } from "@gdapps-studio/ui/button";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export const OutlineGradientButton = ({
  wrapperClassName,
  ...props
}: ComponentPropsWithoutRef<"button"> & { wrapperClassName?: string }) => {
  return (
    <div className={clsx("relative max-w-max p-1", wrapperClassName)}>
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 rounded-full" />
      <Button variant="ghost" className="relative bg-black w-full" {...props} />
    </div>
  );
};
