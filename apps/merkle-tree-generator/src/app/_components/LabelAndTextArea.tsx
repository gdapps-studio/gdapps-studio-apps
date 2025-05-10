import React, { ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";

export const LabelAndTextArea = ({
  label,
  rightLabelElement,
  ...rest
}: React.ComponentProps<"textarea"> & {
  label: string;
  rightLabelElement: ReactNode | null;
}) => (
  <section className="mb-6" aria-label="Address Input">
    <div className="flex items-center justify-between mb-2">
      <label className="block">{label}</label>
      {rightLabelElement}
    </div>

    <Textarea {...rest} />
  </section>
);
