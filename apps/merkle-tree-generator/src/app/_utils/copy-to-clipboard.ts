import { toast } from 'sonner'

export const copyToClipboard = (text: string) =>
    navigator.clipboard.writeText(text).then(() => {
        toast.success('Successfully copied merkle tree 🚀')
    })
