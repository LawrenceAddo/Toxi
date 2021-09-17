import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {RiCopperCoinLine} from 'react-icons/ri'
import {FaBars, FaTimes} from 'react-icons/fa'
import {Button} from '../Button'
import './Navbar.css'
import {IconContext} from 'react-icons/lib'


function Navbar() {

    const [click, setClick] = useState(false)
    const [button, setButton] =useState(true)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const showButton =() => {
        if(window.innerWidth <= 968) {
            setButton(false)
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)
    return (
        <>
        <IconContext.Provider value={{ color: '#fff'}}>
           <div className="navbar">
            <div className="navbar-container container">
                <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                    <RiCopperCoinLine className="navbar-icon" />
                    Toxi
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/'className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Auctions' className="nav-links" onClick={closeMobileMenu}>
                            Live Auctions
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Community' className="nav-links" onClick={closeMobileMenu}>
                            Community
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Create' className="nav-links" onClick={closeMobileMenu}>
                            Create
                        </Link>
                    </li>
                    <li className="nav-btn">
                        {button ? (
                            <Link className="btn-link">
                                <Button to='/Connect' buttonStyle='btn--outline'>Connect Wallet</Button>
                            </Link>
                        ): (
                            <Link to='/Connect' className="btn-link" onClick={closeMobileMenu}>
                                <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>Connect Wallet</Button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
        </IconContext.Provider>
        </>
    )
}

export default Navbar
