import { Config, defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { mainnet } from "viem/chains";

type MaybeArray<T> = T | T[];
type MaybePromise<T> = T | Promise<T>;

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "ERC20",
      abi: erc20Abi,
    },
    {
      name: "USDC",
      abi: erc20Abi,
      address: {
        [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
    },
  ],
  plugins: [react()],
}) as MaybeArray<Config> | (() => MaybePromise<MaybeArray<Config>>);
