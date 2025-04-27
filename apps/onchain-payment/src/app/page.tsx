"use client";

import { PaymentForm } from "./_components/payment-form";

export default function Home() {
  return (
    <div className="flex flex-col pt-20 md:pt-44 justify-center items-center mx-auto">
      <PaymentForm />
    </div>
  );
}
