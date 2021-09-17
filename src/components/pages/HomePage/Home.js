import React from 'react'
import Works from '../../Works'
import Auction from '../../Auction'
import Live from '../../Live'
import Hero from '../../Hero'
import {homeObjOne} from './Data'
import Artist from '../../Artist'
import Testimonial from '../../Testimonial'
// import Footer from '../../Footer'

function Home() {
    return (
        <>
            <Hero {...homeObjOne} />
            <Works />
            {/* <Hero {...homeObjTwo} /> */}
            <Live />
            <Artist />
            <Auction /> {/* Auction page is Collections page */}
            <Testimonial />
            {/* <Footer /> */}
        </>
    )
}

export default Home
