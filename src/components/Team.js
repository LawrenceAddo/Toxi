import React from 'react'
import {Link} from 'react-router-dom'
import {GiPyromaniac} from 'react-icons/gi'
import {SiPostwoman} from 'react-icons/si'
import {VscAccount} from 'react-icons/vsc'
import {GiLizardman} from 'react-icons/gi'
import {IconContext} from 'react-icons/lib'
import './Team.css'

function Team() {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
        <div>
            <div className="Team__section">
                <div className="Team__wrapper">
                    <h1 className="Team__heading">Our Team</h1>
                    <div className="Team__container">
                        <Link to='/connect' className='Team__container-card'>
                            <div className="Team__container-cardInfo">
                                <div className="icon">
                                    <GiPyromaniac />
                                </div>
                                <h3>Sairam Nomula</h3>
                            </div>
                        </Link>

                        <Link to='/connect' className='Team__container-card'>
                            <div className="Team__container-cardInfo">
                                <div className="icon">
                                    <VscAccount />
                                </div>
                                <h3>Vijay</h3>
                            </div>
                        </Link>
                        
                        <Link to='/connect' className='Team__container-card'>
                            <div className="Team__container-cardInfo">
                                <div className="icon">
                                    <SiPostwoman />
                                </div>
                                <h3>Dushyant Reddy</h3>
                            </div>
                        </Link>

                        <Link to='/connect' className='Team__container-card'>
                            <div className="Team__container-cardInfo">
                                <div className="icon">
                                    <GiLizardman />
                                </div>
                                <h3>Toxi</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default Team
