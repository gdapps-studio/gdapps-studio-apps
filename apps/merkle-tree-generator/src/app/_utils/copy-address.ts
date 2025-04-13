import { toast } from 'sonner'

export const copyAddress = ({ address }: { address: string }) => {
    navigator.clipboard
        .writeText(address)
        .then(() => {
            toast.success('Successfully copied ❤️')
        })
        .catch(() => {
            toast.error('Failed to copy 💀')
        })
}
