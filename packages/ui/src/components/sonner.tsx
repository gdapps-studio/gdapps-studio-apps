"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  console.log("Toaster theme:", theme);
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      richColors
      position="top-center"
      {...props}
    />
  );
};

interface ToastProps {
  title: string;
  description?: string | React.ReactNode;
}

const SuccessToast = ({ description, title }: ToastProps) => {
  return (
    <div className="bg-background text-foregroud flex items-center gap-2 rounded-lg border p-4 shadow-lg ring-1 ring-black/5 md:max-w-[364px]">
      <div className="bg-primary flex size-5 items-center justify-center rounded-full">
        <Check className="size-3 font-bold" strokeWidth={2} />
      </div>

      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="font-semibold text-sm">{title}</p>
          {description ? (
            <p className="text-foreground/90 mt-0.5 text-xs">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const successToast = (toast: ToastProps) =>
  sonnerToast.custom(
    () => <SuccessToast title={toast.title} description={toast.description} />,
    {
      position: "bottom-right",
    }
  );

export { Toaster, successToast };
