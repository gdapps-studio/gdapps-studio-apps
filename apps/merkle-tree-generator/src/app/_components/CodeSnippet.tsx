import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { DonationModal } from "./DonationModal";
import { toast } from "sonner";
import { copyToClipboard } from "../_utils/copy-to-clipboard";
import { downloadJson } from "../_utils/download-json";
import { Button } from "@gdapps-studio/ui/button";
export const CODE_SNIPPET_BLOCK_ID = "code-snippet-block";

export type MerkleTreeJson = string;
export const CodeSnippet = ({
  merkleTree,
  addressesLength,
}: {
  merkleTree: MerkleTreeJson;
  addressesLength: number;
}) => {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleAction = (action: "copy" | "download") => {
    if (action === "copy") copyToClipboard(merkleTree);
    else if (action === "download") downloadJson(merkleTree);
    setShowDonationModal(true);
  };

  const shouldShowLoadMore = addressesLength > 5 && !showFullContent;
  const displayedContent = shouldShowLoadMore
    ? merkleTree.split("\n").slice(0, 20).join("\n")
    : merkleTree;

  return (
    <>
      <section
        id={CODE_SNIPPET_BLOCK_ID}
        className="mt-8"
        aria-label="Generated Merkle Tree"
      >
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Generated Merkle Tree</h3>
            <div className="space-x-2">
              <Button
                onClick={() => handleAction("copy")}
                variant="ghost"
                size="icon"
                title="Copy to clipboard"
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleAction("download")}
                variant="ghost"
                size="icon"
                title="Download JSON"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <pre className="bg-background p-4 rounded-md overflow-auto">
              <code>{displayedContent}</code>
            </pre>
            {shouldShowLoadMore && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={() => setShowFullContent(true)}
                    variant="secondary"
                    size="sm"
                  >
                    Load More
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => {
          setShowDonationModal(false);
          toast("Enjoy building the whitelist feature 🫡");
        }}
        onConfirm={() => {
          toast("Thank you!", {
            description: "Enjoy building the whitelist feature 🫡",
          });
          setShowDonationModal(false);
        }}
      />
    </>
  );
};
