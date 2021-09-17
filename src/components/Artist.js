import React from 'react'
import {Link} from 'react-router-dom'
import {GiPyromaniac} from 'react-icons/gi'
import {SiPostwoman} from 'react-icons/si'
import {VscAccount} from 'react-icons/vsc'
import {GiLizardman} from 'react-icons/gi'
import {IconContext} from 'react-icons/lib'
import './Artist.css'

function Artist() {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
        <div>
            <div className="Artist__section">
                <div className="Artist__wrapper">
                    <h1 className="Artist__heading">Creative Artists</h1>
                    <h3 className="Artist__subheading">Top sellers</h3>
                    <div className="Artist__container">
                        <Link to="/Community" className='Artist__container-card'>
                            <div className="Artist__container-cardInfo">
                                <div className="icon">
                                    <GiPyromaniac />
                                </div>
                                <h3>Sairam Nomula</h3>
                            </div>
                        </Link>

                        <Link to='/Community' className='Artist__container-card'>
                            <div className="Artist__container-cardInfo">
                                <div className="icon">
                                    <VscAccount />
                                </div>
                                <h3>Vijay Sugali</h3>
                            </div>
                        </Link>
                        
                        <Link to='/Community' className='Artist__container-card'>
                            <div className="Artist__container-cardInfo">
                                <div className="icon">
                                    <SiPostwoman />
                                </div>
                                <h3>Dushyant Reddy</h3>
                            </div>
                        </Link>

                        <Link to='/Community' className='Artist__container-card'>
                            <div className="Artist__container-cardInfo">
                                <div className="icon">
                                    <GiLizardman />
                                </div>
                                <h3>Unknown</h3>
                            </div>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default Artist
