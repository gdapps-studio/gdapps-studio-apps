import { SVMMerkleTree } from '@/lib/svm-merkle-tree'

export const formatSVMMerkleTree = (json: SVMMerkleTree) => {
    return `{
  "root": [ ${(json.root as number[]).join(', ')} ],
  "values": [ ${json.values.map(
      (value) => `
    {
        "hash": [ ${(value.hash as number[]).join(', ')} ],
        "address": "${value.address}",
        "leafIndex": ${value.leafIndex}
    }`
  )} 
  ]
}`
}
