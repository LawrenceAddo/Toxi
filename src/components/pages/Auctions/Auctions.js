import React from 'react'
import Hero from '../../Hero'
import Live from '../../Live'
import {LiveObjOne} from './Data'

function Auctions() {
    return (
        <>
            <Live />
            <Hero {...LiveObjOne} />
        </>
    )
}

export default Auctions