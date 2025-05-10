import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gdapps-studio/ui/select";

export type MerkleTreeLibrary = "openzeppelin" | "svm-merkle-tree";

export const SelectMerkleTreeLibrary = ({
  value,
  onValueChange,
  label,
  items,
}: {
  value: MerkleTreeLibrary;
  onValueChange: React.ComponentProps<
    typeof SelectPrimitive.Root
  >["onValueChange"];
  label: string;
  items: MerkleTreeLibrary[];
}) => (
  <div className="flex-1 space-y-2 mb-6">
    <label className="block">{label}</label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a library" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
