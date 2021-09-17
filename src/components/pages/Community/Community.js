import React from 'react'
import Hero from '../../Hero'
import Team from '../../Team'
import {communityObjOne} from './Data'

function Community() {
    return (
        <>
            <Hero {...communityObjOne} />
            <Team />
        </>
    )
}

export default Community