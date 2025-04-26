import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

type PickedUseQueryResult<T> = Pick<
  UseQueryResult<T, Error>,
  "data" | "isPending"
>;

type PickedUseMutationResult<T, V> = Pick<
  UseMutationResult<T, Error, V>,
  "mutate" | "isPending"
>;

export type UseBalance = () => PickedUseQueryResult<{
  balance: number;
}>;

export type UseMetadataData = () => PickedUseQueryResult<{
  symbol: string;
}>;

export type UseAccount = () => PickedUseQueryResult<{
  address: string;
  isConnected: boolean;
}>;

export type UseTransaction = () => PickedUseMutationResult<
  {
    hash: string;
  },
  {
    to: string;
    value: string;
  }
>;

export type UseConnectModal = () => {
  openConnectModal: () => void;
};
