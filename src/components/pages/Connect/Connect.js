import React from 'react'
import {connectObjOne} from './Data'
import Hero from '../../Hero'
import Footer from '../../Footer'
function Connect() {
    return (
        <>
            <Hero {...connectObjOne} />
            <Footer />
        </>
    )
}

export default Connect
