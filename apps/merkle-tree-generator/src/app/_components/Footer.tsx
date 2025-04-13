import React from 'react'

import { GDAPPS_URL } from '../_utils/constants'

export const Footer = () => (
    <footer className="mt-8 text-center text-sm text-gray-500">
        Free tool for generating cryptographic proofs for smart contract
        whitelists created by{' '}
        <a href={GDAPPS_URL} target="_blank" className="underline">
            GDapps Studio
        </a>
    </footer>
)
