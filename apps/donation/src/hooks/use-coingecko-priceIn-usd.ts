import { useQuery } from "@tanstack/react-query";

const createPriceQuery = (id: string) => ["coingecko", "price", id];

export const useCoingeckoPriceInUsd = ({
  id,
  enabled = true,
}: {
  id: "ethereum" | "solana" | string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: createPriceQuery(id),
    queryFn: () =>
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
        {
          next: {
            revalidate: 3600,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return (data[id].usd as number) ?? 0;
        }),
    enabled,
  });
};
