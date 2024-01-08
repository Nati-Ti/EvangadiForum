import React, { useContext, useEffect, useRef, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import Menu from '../Menu/Menu';
import axios from 'axios';
import evanLogo from '../../Assets/evanLogo.jpg';
import { LuMenu } from "react-icons/lu";


function Header() {
  
  const [userData, setUserData] = useContext(UserContext);
  // const isMounted = useRef(false);
  const [ menuDropdown, setMenuDropdown ] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  
  // const isMountedRef = useRef(false);

  
  const handleDropdown = () => {
    setMenuDropdown(true);
  }
  const hideDropdown = () => {
    setMenuDropdown(false);
  }

  useEffect(() => {
    setMenuDropdown(false);
  },[userData]);

  const[show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () =>{
            if(window.scrollY > 80){
                setShow(true);
            }
            else setShow(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {

      const fetchProfilePicture = async () => {
        try {
          // console.log(userData.user.id);
          const response = await axios.get(`http://localhost:4000/api/uploads/userProfilePic?userId=${userData.user.id}`, {
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
  
      const timeoutId = setTimeout(fetchProfilePicture, 1000);

      // clearTimeout(timeoutId);
    }, [userData, userData.profileUpdate]);
  
  
  return (
    <div className={` ${show ? 'headerSmallSize' : 'Header'}`}>
      <div className={` ${show ? 'headerContentSmall' : 'header__contents'}`}>
        <div className={`header__logo ${show ? 'headerLogoSmallSize' : ''}`}>
          <Link to='/'>
            {show ? <img className='smallSize__logo' src={evanLogo}/> : 
            <img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt='evangadi logo' />}
            
          </Link>
        </div>
        <div className={`content__wrapper ${show ? 'contentSmallSize' : ''}`}>
          <Link to='/'>
            Home
          </Link>
          {!show ? <p>How it Works</p> : ''}
          {!userData.user ? (
            <Link to='/login'>
              <button>SIGN IN</button>
            </Link>
          ) : (
            <div
              className={`${show ? 'userProfileSmall' : 'user__profile'}`}
              onMouseEnter={() => handleDropdown()}
              onMouseLeave={() => hideDropdown()}
            >
              {show ? <LuMenu className='menuIcon' fontSize='larger' /> : (
                <img
                  src={profilePicture || 'https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png'}
                  alt='profile icon'
                />
              )}

              {menuDropdown && <Menu position={show ? 'right' : 'left'} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header