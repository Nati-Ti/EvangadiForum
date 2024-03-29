import React, { useContext, useEffect } from 'react'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

function Menu({position}) {

  const [userData, setUserData] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
      setUserData({
          token: '',
          user: ''
      });

      localStorage.removeItem('auth-token');
      // window.location.reload();
    };

    useEffect(() => {
        if (!userData.user) navigate("/login");
    }, [userData.user, navigate]);


  return (
    <div className={(position === 'right') ? 'Menu2' : 'Menu' }>
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