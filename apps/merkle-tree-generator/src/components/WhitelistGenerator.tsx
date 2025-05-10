"use client";

import React, { useState } from "react";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { LabelSwitch } from "./LabelSwitch";
import { Button } from "@gdapps-studio/ui/button";
import {
  MerkleTreeLibrary,
  SelectMerkleTreeLibrary,
} from "../app/_components/SelectMerkleTreeLibrary";
import {
  ethInitialAddresses,
  solInitialAddresss,
} from "../app/_utils/initial-addresses";
import { PublicKey } from "@solana/web3.js";
import {
  MerkleTreeJson,
  CODE_SNIPPET_BLOCK_ID,
  CodeSnippet,
} from "../app/_components/CodeSnippet";
import { GithubLogo } from "../app/_components/GithubLogo";
import { LabelAndTextArea } from "../app/_components/LabelAndTextArea";
import { MyError } from "../app/_components/MyError";
import { libraryToChainName, libraryToGhLink } from "../app/_utils/constants";
import { formatSVMMerkleTree } from "../app/_utils/format-svm-merkle-tree";
import { scrollToElement } from "../app/_utils/scroll-to-element";
import { validateAddresses } from "../app/_utils/validate-addresses";
import { getSVMMerkleTreeJson } from "../lib/svm-merkle-tree";

const INITIAL_LIBRARY = "openzeppelin" as MerkleTreeLibrary;
const INITIAL_IS_SVM_VALUES_HEX = true;

const SCROLL_DELAY_TIME_IN_MS = 10;

const WhitelistGenerator: React.FC = () => {
  const [selectedLibrary, setSelectedLibrary] =
    useState<MerkleTreeLibrary>(INITIAL_LIBRARY);

  const getDummyAddresses = (lib: MerkleTreeLibrary) => {
    if (lib === "svm-merkle-tree") return solInitialAddresss.join("\n");
    else if (lib === "openzeppelin") return ethInitialAddresses.join("\n");
    return "";
  };

  const [addresses, setAddresses] = useState<string>(
    getDummyAddresses(INITIAL_LIBRARY)
  );
  const [merkleTree, setMerkleTree] = useState<MerkleTreeJson>();
  const [isSVMValuesHex, setSVMValuesHex] = useState<boolean>(
    INITIAL_IS_SVM_VALUES_HEX
  );

  const [error, setError] = useState<string>("");

  const chainName = libraryToChainName[selectedLibrary];

  const filterAddresses = () =>
    addresses
      .split("\n")
      .map((addr) => addr.trim())
      .filter((addr) => !!addr);

  const generateTree = () => {
    try {
      const addressList = filterAddresses();

      if (addressList.length < 2) {
        setError("Enter at least 2 addresses");
        return;
      }

      if (!validateAddresses({ addressList, selectedLibrary })) {
        setError(
          `Invalid ${chainName} address detected. Please check your input.`
        );
        return;
      }

      if (selectedLibrary === "svm-merkle-tree") {
        const json = getSVMMerkleTreeJson(
          addressList.map((address) => new PublicKey(address)),
          isSVMValuesHex
        );

        setMerkleTree(
          !isSVMValuesHex
            ? formatSVMMerkleTree(json)
            : JSON.stringify(json, null, 2)
        );
        setError("");
      } else if (selectedLibrary === "openzeppelin") {
        const tree = StandardMerkleTree.of(
          addressList.map((address) => [address]),
          ["address"]
        );

        setMerkleTree(
          JSON.stringify({ root: tree.root, ...tree.dump() }, null, 2)
        );
        setError("");
      }
      const timer = setTimeout(() => {
        scrollToElement(CODE_SNIPPET_BLOCK_ID);
        clearInterval(timer);
      }, SCROLL_DELAY_TIME_IN_MS);
    } catch (err) {
      setError("Error generating merkle tree. Please check your input.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex gap-2 items-center">
        <SelectMerkleTreeLibrary
          items={["openzeppelin", "svm-merkle-tree"]}
          label={"Select Library:"}
          value={selectedLibrary}
          onValueChange={(value: MerkleTreeLibrary) => {
            setSelectedLibrary(value);
            setAddresses(getDummyAddresses(value));
            setMerkleTree(undefined);
            setError("");
          }}
        />
        <GithubLogo href={libraryToGhLink[selectedLibrary]} />
      </div>

      <LabelAndTextArea
        label={`Enter ${chainName} addresses (one per line):`}
        value={addresses}
        rightLabelElement={
          selectedLibrary === "svm-merkle-tree" ? (
            <LabelSwitch
              label="toHex"
              checked={isSVMValuesHex}
              onCheckedChange={setSVMValuesHex}
              id="svm-merkle-tree-to-hex-switcher"
            />
          ) : null
        }
        onChange={(e) => setAddresses(e.target.value)}
      />

      {error && <MyError error={error} />}

      <div className="flex justify-center">
        <Button size={"lg"} onClick={generateTree} className="mx-auto">
          Generate Merkle Tree
        </Button>
      </div>

      {merkleTree ? (
        <CodeSnippet
          addressesLength={filterAddresses().length}
          merkleTree={merkleTree}
        />
      ) : null}
    </div>
  );
};

export default WhitelistGenerator;
