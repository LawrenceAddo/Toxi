import React from 'react'
import {connectObjOne} from './Data'
import Hero from '../../Hero'

function Connect() {
    return (
        <>
            <Hero {...connectObjOne} />
        </>
    )
}

export default Connect
