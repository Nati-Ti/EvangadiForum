import React, { useContext } from 'react'
import './Question.css'
import { UserContext } from '../../Context/UserContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

function Question() {
  const [userData, setUserData] = useContext(UserContext);

  return (
    <div className='Question'>
      <div className='userInfo'>
        <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
        <p>{userData.user?.display_name}</p>
      </div>
        
      
      <Link to='/answer' className='question__content'>
        <h3>What is HTML?</h3>
        <p>I need to know what type of technology it uses, what the abbrevation is and also how to implement it?</p>
      </Link>
      <ArrowForwardIosIcon className='forwardIcon'/>
    </div>
  )
}

export default Question