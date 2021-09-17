import React from 'react'
import {Link} from 'react-router-dom'
import {BsWallet} from 'react-icons/bs'
import {AiOutlineAppstore} from 'react-icons/ai'
import {MdCloudUpload} from 'react-icons/md'
import {BiShoppingBag} from 'react-icons/bi'
import {IconContext} from 'react-icons/lib'
import './Works.css'

function works() {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
        <div>
            <div className="works__section">
                <div className="works__wrapper">
                    <h1 className="works__heading">How it works</h1>
                    <h3 className="works__subheading">Create and sell your NFTs</h3>
                    <div className="works__container">
                        <Link to='/connect' className='works__container-card'>
                            <div className="works__container-cardInfo">
                                <div className="icon">
                                    <BsWallet />
                                </div>
                                <h3>Set up your wallet</h3>
                                <p>Once you've set up your wallet of choice, connect it to your choice by clicking the NFT Marketplace in the top right corner. Learn about the wallets we support.</p>
                            </div>
                        </Link>

                        <Link to='/connect' className='works__container-card'>
                            <div className="works__container-cardInfo">
                                <div className="icon">
                                    <AiOutlineAppstore />
                                </div>
                                <h3>Create your collection</h3>
                                <p>Click create and set up your collection. Add necessary details if you want to.</p>
                            </div>
                        </Link>
                        
                        <Link to='/connect' className='works__container-card'>
                            <div className="works__container-cardInfo">
                                <div className="icon">
                                    <MdCloudUpload />
                                </div>
                                <h3>Add your NFTs</h3>
                                <p>Upload your work, add title, description and customize your NFTs with properties, stats, and unlockable content.</p>
                            </div>
                        </Link>

                        <Link to='/connect' className='works__container-card'>
                            <div className="works__container-cardInfo">
                                <div className="icon">
                                    <BiShoppingBag />
                                </div>
                                <h3>List them for sale</h3>
                                <p>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default works