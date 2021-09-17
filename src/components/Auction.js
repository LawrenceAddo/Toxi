import React from 'react'
import {Link} from 'react-router-dom'
import {GiWaterSplash} from 'react-icons/gi'
import {SiFigshare} from 'react-icons/si'
import {SiFossilscm} from 'react-icons/si'
import {GiBleedingHeart} from 'react-icons/gi'
import {IconContext} from 'react-icons/lib'
import './Auction.css'
/* This is for Collections ----- Popular NFTs */
function Auction() {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
        <div>
            <div className="auction__section">
                <div className="auction__wrapper">
                    <h1 className="auction__heading">Popular NFTs</h1>
                    <h3 className="auction__subheading">Most Popular</h3>
                    <div className="auction__container">
                        <Link to='/' className='auction__container-card'>
                            <div className="auction__container-cardInfo">
                                <div className="icon">
                                    <GiWaterSplash />
                                </div>
                                <h3>Splash</h3>
                                <p>by XXXX</p>
                                {/* <Button buttonSize='btn--wide' buttonColor='primary'>
                                    View more
                                </Button> */}
                            </div>
                        </Link>

                        <Link to='/' className='auction__container-card'>
                            <div className="auction__container-cardInfo">
                                <div className="icon">
                                    <SiFossilscm />
                                </div>
                                <h3>Fossill</h3>
                                <p>by XXXX</p>
                                {/* <Button buttonSize='btn--wide' buttonColor='purple'>
                                    View more
                                </Button> */}
                            </div>
                        </Link>
                        
                        <Link to='/' className='auction__container-card'>
                            <div className="auction__container-cardInfo">
                                <div className="icon">
                                    <SiFigshare />
                                </div>
                                <h3>Spiry</h3>
                                <p>by XXXX</p>
                                {/* <Button buttonSize='btn--wide' buttonColor='primary'>
                                    View more
                                </Button> */}
                            </div>
                        </Link>

                        <Link to='/' className='auction__container-card'>
                            <div className="auction__container-cardInfo">
                                <div className="icon">
                                    <GiBleedingHeart />
                                </div>
                                <h3>BleedArt</h3>
                                <p>by XXXX</p>
                                {/* <Button buttonSize='btn--wide' buttonColor='purple'>
                                    View more
                                </Button> */}
                            </div>
                        </Link>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default Auction
