import { Button } from "@gdapps-studio/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@gdapps-studio/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@gdapps-studio/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@gdapps-studio/ui/select";
import {
  paymentFormDefaultValues,
  PaymentFormSchema,
  paymentFormSchema,
} from "./payment-schema";
import {
  chainToDefaultCurrency,
  chainToImageSrc,
  chainToPlaceholder,
  ChainUnion,
  currencyToImageSrc,
  ethCurrencyValues,
  solCurrencyValues,
  supportedChains,
} from "@/constants";
import { ReactNode } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gdapps-studio/ui/card";
import { ExternalLink } from "lucide-react";
import { buildPaymentPagePath } from "../_utils/build-query-parameters";
import { toast } from "sonner";

const FormItemLabelAndDescription = ({
  input,
  label,
  description,
}: {
  input: ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{input}</FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
export const PaymentForm = () => {
  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: paymentFormDefaultValues,
  });

  const chain = form.getValues("chain");

  return (
    <Card
      className="flex flex-col gap-6 w-full max-w-xs md:max-w-xl mx-auto px-6 py-4 md:px-12 md:py-10"
      scaleOnHover={false}
    >
      <CardHeader>
        <CardTitle>Create a payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(({ address, amount, chain, currency }) => {
                // @ts-ignore
                const buttonClicked = e.nativeEvent.submitter?.value;
                if (buttonClicked === "copy") {
                  const originUrl = window.location.origin;
                  navigator.clipboard.writeText(
                    `${originUrl}${buildPaymentPagePath({
                      address,
                      amount,
                      chain,
                      currency,
                    })}`
                  );
                  toast.success("Payment link copied to clipboard", {
                    description: "ou can now share it with anyone",
                  });
                } else if (buttonClicked === "open") {
                  window.open(
                    buildPaymentPagePath({
                      address,
                      amount,
                      chain,
                      currency,
                    })
                  );
                }
              })(e);
            }}
            className="w-full max-w-xl space-y-6"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItemLabelAndDescription
                  input={<Input placeholder={"0"} {...field} />}
                  description="Enter how much you want to receive"
                  label="Amount"
                />
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItemLabelAndDescription
                  input={
                    <Input placeholder={chainToPlaceholder[chain]} {...field} />
                  }
                  description="Enter who is going to pay you"
                  label="Payer"
                />
              )}
            />
            <FormField
              control={form.control}
              name="chain"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Chain</FormLabel>
                  <Select
                    onValueChange={(value: ChainUnion) => {
                      form.setValue("currency", chainToDefaultCurrency[value]);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <div className="flex items-center gap-1">
                          <Image
                            src={chainToImageSrc[field.value]}
                            width={24}
                            height={24}
                            alt={`${field.value} chain logo`}
                          />
                          <span className="capitalize">{field.value}</span>
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {supportedChains.map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="flex items-center"
                        >
                          <Image
                            src={chainToImageSrc[value]}
                            width={24}
                            height={24}
                            alt={`${value} chain logo`}
                          />
                          <span className="capitalize">{value}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <div className="flex items-center gap-1">
                          <Image
                            src={currencyToImageSrc[field.value]}
                            width={24}
                            height={24}
                            alt={`${field.value} currency logo`}
                          />
                          <span className="uppercase">{field.value}</span>
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      defaultValue={chain === "solana" ? "sol" : "eth"}
                    >
                      {(chain === "solana"
                        ? solCurrencyValues
                        : ethCurrencyValues
                      ).map((currency) => (
                        <SelectItem
                          key={currency}
                          className="uppercase"
                          value={currency}
                        >
                          <div className="flex items-center gap-1">
                            <Image
                              src={currencyToImageSrc[currency]}
                              width={24}
                              height={24}
                              alt={`${currency} currency logo`}
                            />
                            <span className="uppercase">{currency}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <Button
                value="copy"
                className="md:flex-1"
                size={"lg"}
                type="submit"
              >
                Copy Payment
              </Button>
              <Button
                value="open"
                className="relative md:flex-1"
                size={"lg"}
                type="submit"
                variant={"secondary"}
              >
                <ExternalLink className="absolute right-4" />
                <span>Open In Tab</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
