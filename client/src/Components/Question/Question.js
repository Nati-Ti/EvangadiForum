import React from 'react'
import './Question.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

function Question({title, description, userName}) {
  
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className='Question'>
      <div className='userInfo'>
        <div className='userInfo__wrapper'>
          <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
          <p>{userName}</p>
        </div>
      </div>
        
      
      <Link to='/answer' className='question__content'>
        <h3>{title}</h3>
        <p>{truncate(description, 140)}</p>
      </Link>
      <ArrowForwardIosIcon className='forwardIcon'/>
    </div>
  )
}

export default Question