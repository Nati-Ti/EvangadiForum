import React, { useContext, useEffect } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

function Header() {
  const [userData, setUserData] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
      setUserData({
          token: '',
          user: ''
      });

      localStorage.removeItem('auth-token');
    };

    useEffect(() => {
        if (!userData.user) navigate("/login");
    }, [userData.user, navigate]);

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
          <button onClick={ handleLogout}>{userData.user ? 'LogOut' : 'SIGN IN'}</button>
        </div>
      </div>
    </div>
  )
}

export default Header