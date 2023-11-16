import React, { useContext, useEffect } from 'react'
import './AnswerComp.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

function AnswerComp({userName, answer}) {
  
  const [userData, setUserData] = useContext(UserContext);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className='AnswerComp'>
      <div className='userInfo'>
        <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
        <p>{userName}</p>
      </div>
        
      
      <Link to='/answer' className='answer__content'>
        <p>{truncate(answer, 300)}</p>
      </Link>
    </div>
  )
}

export default AnswerComp