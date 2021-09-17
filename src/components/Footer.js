import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link} from 'react-router-dom';
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import { RiCopperCoinLine } from 'react-icons/ri';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join us to receive the latest news and trends
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
      <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Team</h2>
            <a href='https://github.com/SairamNomula' target="_blank" rel="noopener noreferrer">Sairam Nomula</a>
            <a href='https://github.com/sugalivijaychari' target="_blank" rel="noopener noreferrer">Vijay Sugali</a>
            <a href='https://github.com/Dushyant029' target="_blank" rel="noopener noreferrer">K. Dushyant Reddy</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/'>How it works</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
            <Link to='/'>Privacy policy</Link>
          </div>
          
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Sponsorships</Link>
            <Link to='/'>Donate</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href='https://www.instagram.com/sairam_nomula/' target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href='https://twitter.com/Sairamnomula11' target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href='https://github.com/SairamNomula' target="_blank" rel="noopener noreferrer">Github</a>
            <a href='https://www.linkedin.com/in/sairam-nomula-8aa752192/' target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <RiCopperCoinLine className='navbar-icon' />
              Toxi
            </Link>
          </div>
          <small className='website-rights'>Toxi © 2021</small>
          <div className='social-icons'>
            <a
              className='social-icon-link'
              href='https://www.instagram.com/sairam_nomula/'
              target='_blank'
              aria-label='Instagram'
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className='social-icon-link'
              href='https://github.com/SairamNomula'
              target='_blank'
              aria-label='Github'
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              className='social-icon-link'
              href='https://www.linkedin.com/in/sairam-nomula-8aa752192/'
              target='_blank'
              aria-label='LinkedIn'
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;