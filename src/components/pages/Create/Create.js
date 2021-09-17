import React from 'react'
import Hero from '../../Hero'
import {CreateObjOne} from './Data'

function Create() {
    return (
        <>
            <Hero {...CreateObjOne} />
        </>
    )
}

export default Create