import { ReactNode } from "react";

export const CardRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | ReactNode;
}) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}:</span>
    <span className="text-lg font-semibold">{value}</span>
  </div>
);
