import {
  chainEthLiteral,
  chainSolLiteral,
  ChainUnion,
  ethCurrencies,
  solCurrencies,
} from "@/constants";
import { isValidSolanaAddress } from "@/utils/is-valid-solana-address";
import { Address, isAddress } from "viem";
import { z } from "zod";

const amount = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Amount must be a number",
  })
  .refine((val) => Number(val) > 0, {
    message: "Amount must be greater than 0",
  });

export const paymentFormSchema = z.discriminatedUnion("chain", [
  z.object({
    address: z.custom<Address>(isAddress, "Invalid Ethereum address"),
    chain: chainEthLiteral,
    amount,
    currency: ethCurrencies,
  }),
  z.object({
    address: z.custom<string>(
      (address) =>
        isValidSolanaAddress({
          address,
        }),
      "Invalid Solana address",
    ),
    chain: chainSolLiteral,
    amount,
    currency: solCurrencies,
  }),
]);

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;

const DEBUG_CHAIN = "ethereum" as ChainUnion;

// @ts-expect-error chain and currency complain due to zod union type issue
export const paymentFormDefaultValues: PaymentFormSchema = {
  address:
    process.env.NODE_ENV === "development"
      ? DEBUG_CHAIN === "solana"
        ? "7cbGX6WKXakVrDLpGWM4b9M29YbUqToEcyWu3VitmZQS"
        : "0x964cbFD1B733CDd6ee6Cd6014ae96e96e3bE324f"
      : "",
  chain: process.env.NODE_ENV === "development" ? DEBUG_CHAIN : "ethereum",
  amount: process.env.NODE_ENV === "development" ? "0.1" : "0",
  currency:
    process.env.NODE_ENV === "development"
      ? DEBUG_CHAIN === "solana"
        ? "sol"
        : "eth"
      : "eth",
};
