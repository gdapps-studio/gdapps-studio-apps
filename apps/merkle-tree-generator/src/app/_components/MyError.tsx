import React from 'react'

export const MyError = (props: { error: string }) => (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
        {props.error}
    </div>
)
