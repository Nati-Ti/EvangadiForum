import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='Header'>
      <div className='header__contents'>
        <div className='header__logo'>
          <Link to='/'>
            <img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt='evangadi logo' />
          </Link>
        </div>
        <div className='content__wrapper'>
          <p>Home</p>
          <p>How it Works</p>
          <button>SIGN IN</button>
        </div>
      </div>
    </div>
  )
}

export default Header