import React from 'react'
import Hero from '../../Hero'
import Team from '../../Team'
import {communityObjOne} from './Data'
import Footer from '../../Footer'

function Community() {
    return (
        <>
            <Hero {...communityObjOne} />
            <Team />
            <Footer />
        </>
    )
}

export default Community