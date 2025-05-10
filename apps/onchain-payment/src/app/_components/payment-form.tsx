import { Button } from "@gdapps-studio/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Form,
} from "@gdapps-studio/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@gdapps-studio/ui/input";
import {
  paymentFormDefaultValues,
  PaymentFormSchema,
  paymentFormSchema,
} from "./payment-schema";
import {
  chainToDefaultCurrency,
  chainToPlaceholder,
  ChainUnion,
} from "@/constants";
import { FormEvent, ReactNode, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gdapps-studio/ui/card";
import { ExternalLink } from "lucide-react";
import { buildPaymentPagePath } from "../_utils/build-query-parameters";
import { successToast } from "@gdapps-studio/ui/sonner";
import { ChainSelector } from "./chain-selector";
import { useEthereumHooks, useSolanaHooks } from "@/hooks/use-blockchain-hooks";

const usePaymentFormBlockchainHooks = ({ chain }: { chain: ChainUnion }) => {
  const {
    useAccount: useEthereumAccount,
    useConnectModal: useEthereumConnect,
    useDisconnect: useEthereumDisconnect,
  } = useEthereumHooks();
  const {
    useAccount: useSolanaAccount,
    useConnectModal: useSolanaConnect,
    useDisconnect: useSolanaDisconnect,
  } = useSolanaHooks();
  const { data: ethereumAccount } = useEthereumAccount();
  const { address: ethereumAddress, isConnected: isEthereumConnected } =
    ethereumAccount ?? {};
  const { data: solanaAccount } = useSolanaAccount();
  const { address: solanaAddress, isConnected: isSolanaConnected } =
    solanaAccount ?? {};

  const { openConnectModal: ethereumConnect } = useEthereumConnect();
  const { openConnectModal: solanaConnect } = useSolanaConnect();

  const solanaDisconnect = useEthereumDisconnect();
  const ethereumDisconnect = useSolanaDisconnect();
  return {
    address: chain === "ethereum" ? ethereumAddress : solanaAddress,
    isConnected: chain === "ethereum" ? isEthereumConnected : isSolanaConnected,
    openConnectModal: chain === "ethereum" ? ethereumConnect : solanaConnect,
    disconnect: chain === "ethereum" ? solanaDisconnect : ethereumDisconnect,
  };
};

const FormItemLabelAndDescription = ({
  input,
  label,
  description,
}: {
  input: ReactNode;
  label: ReactNode;
  description?: string;
}) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>{input}</FormControl>
    {description ? <FormDescription>{description}</FormDescription> : null}
  </FormItem>
);

export const PaymentForm = () => {
  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: paymentFormDefaultValues,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    form.handleSubmit(({ address, amount, chain }) => {
      // @ts-expect-error nativeEvent.submitter is not defined in the type
      const buttonClicked = e.nativeEvent.submitter?.value;
      if (buttonClicked === "copy") {
        const originUrl = window.location.origin;
        navigator.clipboard.writeText(
          `${originUrl}${buildPaymentPagePath({
            address,
            amount,
            chain,
            currency: chainToDefaultCurrency[chain],
          })}`,
        );

        successToast({
          title: "Payment link copied",
          description: "You can now share it with anyone",
        });
      } else if (buttonClicked === "open") {
        window.open(
          buildPaymentPagePath({
            address,
            amount,
            chain,
            currency: chainToDefaultCurrency[chain],
          }),
        );
      }
    })(e);
  };

  const chain = form.watch("chain");
  const { address, disconnect, isConnected, openConnectModal } =
    usePaymentFormBlockchainHooks({ chain });

  useEffect(() => {
    if (isConnected && address) {
      form.setValue("address", address, {
        shouldValidate: true,
      });
    } else {
      form.setValue("address", "");
    }
  }, [address, isConnected]);

  return (
    <Card
      className="mx-auto flex w-full max-w-xs flex-col gap-6 px-6 py-4 md:max-w-xl md:px-12 md:py-10"
      scaleOnHover={false}
    >
      <CardHeader>
        <CardTitle>Create a payment request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full max-w-xl space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItemLabelAndDescription
                  input={
                    <Input placeholder={chainToPlaceholder[chain]} {...field} />
                  }
                  label={
                    <div className="flex w-full items-center justify-between">
                      <span>Recipient Wallet Address</span>
                      <button
                        onClick={() => {
                          if (!isConnected) openConnectModal();
                          else disconnect();
                        }}
                        className="text-foreground underline"
                      >
                        {isConnected ? "Remove" : "Use My Wallet"}
                      </button>
                    </div>
                  }
                />
              )}
            />
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

            <div className="flex flex-col gap-2">
              <FormLabel>Payment Network & Currency</FormLabel>

              <FormField
                control={form.control}
                name="chain"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <ChainSelector
                      onSelected={(chain) => {
                        // form.setValue(
                        //   "currency",
                        //   chainToDefaultCurrency[chain],
                        // );
                        form.setValue("address", "");
                        field.onChange(chain);
                      }}
                      selectedChain={field.value}
                    />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <CurrencySelectorSelector
                      onSelected={(currency) => {
                        field.onChange(currency);
                      }}
                      selectedChain={form.getValues("chain")}
                      selectedCurrency={field.value}
                    />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-center">
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
                variant={"outline"}
              >
                <ExternalLink className="absolute right-5 size-4" />
                <span>Preview in Tab</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
