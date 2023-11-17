import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import Menu from '../Menu/Menu';

function Header() {
  const [userData, setUserData] = useContext(UserContext);


    const [ menuDropdown, setMenuDropdown ] = useState(false);

    const handleDropdown = () => {
      setMenuDropdown(true);
    }
    const hideDropdown = () => {
      setMenuDropdown(false);
    }

    useEffect(() => {
      setMenuDropdown(false);
    },[userData]);

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
          {!userData.user ? 
          <button>SIGN IN</button>
          :  
          <div className='user__profile'
          onMouseEnter={handleDropdown}
          onMouseLeave={hideDropdown}
          >
            <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
            {menuDropdown && <Menu/>}
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header