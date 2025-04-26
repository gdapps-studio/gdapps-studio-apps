import { Switch } from "./ui/switch";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Label } from "@gdapps-studio/ui/label";
export const LabelSwitch = ({
  label,
  id,
  ...rest
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { label: string }) => (
  <div className="flex items-center space-x-2">
    <Switch id={id} {...rest} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);
