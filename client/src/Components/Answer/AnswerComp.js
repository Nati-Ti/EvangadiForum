import React, { useContext, useEffect } from 'react'
import './AnswerComp.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

function AnswerComp({userName, answer}) {
  
  const [userData, setUserData] = useContext(UserContext);

  return (
    <div className='AnswerComp'>
      <div className='userInfo'>
        <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
        <p>{userName}</p>
      </div>
        
      
      <Link to='/answer' className='answer__content'>
        <p>{answer}</p>
      </Link>
    </div>
  )
}

export default AnswerComp