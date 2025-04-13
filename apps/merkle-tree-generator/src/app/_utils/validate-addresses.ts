import { MerkleTreeLibrary } from "@/app/_components/SelectMerkleTreeLibrary";
import { isEveryEthereumAddress } from "@/app/_utils/is-every-ethereum-address";
import { isEverySolanaAddress } from "@/app/_utils/is-every-solana-addresses";
import { Address } from "viem";

export const validateAddresses = ({
  addressList,
  selectedLibrary,
}: {
  addressList: string[];
  selectedLibrary: MerkleTreeLibrary;
}) => {
  if (selectedLibrary === "openzeppelin")
    return isEveryEthereumAddress({ addresses: addressList as Address[] });
  else if (selectedLibrary === "svm-merkle-tree")
    return isEverySolanaAddress({
      addresses: addressList,
    });
  return false;
};
