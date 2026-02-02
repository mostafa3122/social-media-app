import React from 'react'

function ValidationError({error}) {
    return (
        <>
        {error &&<p className="text-red-500">{error.message}</p>}
        </>

    )
}

export default ValidationError
