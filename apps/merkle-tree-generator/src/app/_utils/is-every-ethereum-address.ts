import { Address, isAddress } from 'viem'

export const isEveryEthereumAddress = ({
    addresses,
}: {
    addresses: Address[]
}) => addresses.every((address) => isAddress(address))
