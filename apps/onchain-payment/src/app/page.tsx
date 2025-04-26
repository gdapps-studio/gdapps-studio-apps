"use client";

import { BackButton } from "@/components/back-button";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { useRouter } from "next/navigation";
import { PaymentCard } from "./_components/payment-card";
import { PaymentForm } from "./_components/payment-form";
import { buildQueryParameters } from "./_utils/build-query-parameters";

export default function Home() {
  const router = useRouter();
  const { isPaymentRequestParamsValid } = useExtractSearchParams();

  return (
    <div className="flex flex-col pt-20 md:pt-44 justify-center items-center mx-auto">
      {!isPaymentRequestParamsValid ? (
        <PaymentForm
          onSubmit={({ address, amount, chain, currency }) => {
            router.push(
              buildQueryParameters({
                address,
                amount,
                chain,
                currency,
              })
            );
          }}
        />
      ) : (
        <div className="w-full space-y-10 max-w-xl mx-auto">
          <BackButton />
          <PaymentCard />
        </div>
      )}
    </div>
  );
}
