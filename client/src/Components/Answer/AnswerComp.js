import React, { useContext } from 'react'
import './AnswerComp.css'
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom';

function AnswerComp() {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <div className='AnswerComp'>
      <div className='userInfo'>
        <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
        <p>{userData.user?.display_name}</p>
      </div>
        
      
      <Link to='/answer' className='answer__content'>
        <p>I need to know what type of technology it uses, what the abbrevation is and also how to implement it?</p>
      </Link>
    </div>
  )
}

export default AnswerComp