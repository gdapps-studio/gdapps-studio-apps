import { Keypair } from '@solana/web3.js'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

export const ethInitialAddresses = Array.from({ length: 3 }).map(
    () => privateKeyToAccount(generatePrivateKey()).address
)

export const solInitialAddresss = Array.from({ length: 3 }).map(() =>
    Keypair.generate().publicKey.toBase58()
)
