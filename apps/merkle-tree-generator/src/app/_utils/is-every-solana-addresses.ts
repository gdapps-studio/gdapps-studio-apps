import { PublicKey } from '@solana/web3.js'

export const isEverySolanaAddress = ({ addresses }: { addresses: string[] }) =>
    addresses.every((address) => PublicKey.isOnCurve(address))
