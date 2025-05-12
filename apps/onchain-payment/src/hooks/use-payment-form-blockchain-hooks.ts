import { ChainUnion } from "@/constants";
import { useEthereumHooks, useSolanaHooks } from "./use-blockchain-hooks";

export const usePaymentFormBlockchainHooks = ({
  chain,
}: {
  chain: ChainUnion;
}) => {
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
