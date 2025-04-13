import { PublicKey } from "@solana/web3.js";
import { HashingAlgorithm, MerkleTree } from "./svm_merkle_tree";

const BYTE = 32;
const merkleTree = new MerkleTree(HashingAlgorithm.Keccak, BYTE);

type SVMMerkleTreeHash = string | number[];

export type SVMMerkleTree = {
  root: SVMMerkleTreeHash;
  values: {
    leafIndex: number;
    address: string;
    hash: SVMMerkleTreeHash;
  }[];
};

export const getSVMMerkleTreeJson = (
  publicKeys: PublicKey[],
  showInHash = true
): SVMMerkleTree => {
  publicKeys.forEach((pubKey) => {
    merkleTree.add_leaf(pubKey.toBytes());
  });
  merkleTree.merklize();
  const merkleRootUintArray = merkleTree.get_merkle_root();

  const hashes = publicKeys.map((_p, i) => {
    const merkleProof = merkleTree.merkle_proof_index(i);

    const merkleProofPairingHashes = merkleProof.get_pairing_hashes();

    return showInHash
      ? Buffer.from(merkleProofPairingHashes).toString("hex")
      : Array.from(merkleProofPairingHashes);
  });

  return {
    root: showInHash
      ? Buffer.from(merkleRootUintArray).toString("hex")
      : Array.from(merkleRootUintArray),
    values: publicKeys.map((pubKey, i) => {
      return {
        leafIndex: i,
        address: pubKey.toBase58(),
        hash: hashes[i],
      };
    }),
  };
};
