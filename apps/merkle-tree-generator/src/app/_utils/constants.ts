import { MerkleTreeLibrary } from '../_components/SelectMerkleTreeLibrary'

export const libraryToChainName: Record<MerkleTreeLibrary, string> = {
    'svm-merkle-tree': 'Solana',
    openzeppelin: 'Ethereum',
}

export const libraryToGhLink: Record<MerkleTreeLibrary, string> = {
    'svm-merkle-tree': 'https://github.com/deanmlittle/svm-merkle-tree',
    openzeppelin: 'https://github.com/openzeppelin',
}

export const GDAPPS_URL = 'https://www.gdapps.studio/'
