export const buildPaymentPagePath = ({
  address,
  amount,
  chain,
  currency,
}: {
  address: string;
  amount: string;
  chain: string;
  currency: string;
}) => {
  const params = new URLSearchParams();
  params.append("address", address);
  params.append("amount", amount);
  params.append("chain", chain);
  params.append("currency", currency);
  return `/payment?${params.toString()}`;
};
