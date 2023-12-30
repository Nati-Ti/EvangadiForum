import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import Menu from '../Menu/Menu';
import axios from 'axios';

function Header() {
  
  const [userData, setUserData] = useContext(UserContext);
  const [ menuDropdown, setMenuDropdown ] = useState(false);
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        // console.log(userData.user.id);
        const response = await axios.get(`http://localhost:4000/api/uploads/userProfilePic?userId=${userData.user?.id}`, {
          responseType: 'blob', // Ensure binary response
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchProfilePicture();
  }, [[],userData.profileUpdate]);

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
          <Link to='/'>
            <p>Home</p>
          </Link>
          <p>How it Works</p>
          {!userData.user ? 
          <Link to='/login'><button>SIGN IN</button></Link>
          :  
          <div className='user__profile'
          onMouseEnter={handleDropdown}
          onMouseLeave={hideDropdown}
          >
            <img src={profilePicture || `https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png`} alt='profile icon' />
            {menuDropdown && <Menu/>}
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header