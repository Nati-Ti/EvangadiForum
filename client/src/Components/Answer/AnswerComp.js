import React from 'react'
import './AnswerComp.css'
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';

function AnswerComp({userName, answer, answerId, upvotes, downvotes}) {
  
  

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className='AnswerComp'>
      <div className='userInfo'>
        <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
        <p>{userName}</p>
      </div>
      
      <div className='voteWrapper'>
        <Vote
        route='answers' 
        instanceId={answerId}
        upvotes={upvotes}
        downvotes={downvotes} />
      </div>
      
      <Link to='/answer' className='answer__content'>
        <p>{truncate(answer, 300)}</p>
      </Link>
    </div>
  )
}

export default AnswerComp