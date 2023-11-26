import React, { useContext, useEffect } from 'react'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

function Menu() {

  const [userData, setUserData] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
      setUserData({
          token: '',
          user: ''
      });

      localStorage.removeItem('auth-token');
      navigate('/login');
    };

    useEffect(() => {
        if (!userData.user) navigate("/login");
    }, [userData.user, navigate]);


  return (
    <div className='Menu'>
      <div className='dropdown__menu'>
          <p>Signed in as: {userData.user.display_name}</p>
          <Link to='/profile'>Profile</Link>
          <Link to='/myQuestion'>My Questions</Link>
          <p onClick={ handleLogout} >LogOut</p>
      </div>
      
    </div>
  )
}

export default Menu