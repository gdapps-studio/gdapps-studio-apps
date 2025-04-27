"use client";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";
import { PaymentCard } from "../_components/payment-card";

const PayPage = () => {
  const { isPaymentRequestParamsValid } = useExtractSearchParams();

  return (
    <div className="flex flex-col pt-44 justify-center items-center mx-auto">
      {isPaymentRequestParamsValid ? (
        <>
          <div className="w-full max-w-xl mx-auto">
            <PaymentCard />
          </div>
        </>
      ) : (
        <h1>Invalid parameters</h1>
      )}
    </div>
  );
};

export default PayPage;
