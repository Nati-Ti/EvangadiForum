import React, { useEffect, useState } from 'react'
import './Question.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import axios from 'axios';

function Question({ title, description, questionId, userName, upvotes, downvotes}) {
  

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const [ answerCount, setAnswerCount ] = useState(0);

  useEffect(() => {
    const fetchAnswerCount = async () => {
      await axios.get(`http://localhost:4000/api/answers/numOfAnswers?questionId=${questionId}`)
      .then((result) => setAnswerCount(result.data.data))
      .catch((err) => {
        console.log(err);
      });
    }

    fetchAnswerCount();
  }, []);



  return (
    <div className='Question'>
      <div className='userInfo'>
        <div className='userInfo__wrapper'>
          <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
          <p>{userName}</p>
        </div>
      </div>

      <div className='reaction__vote'>
        <Vote 
        route='questions'
        instanceId={questionId}
        upvotes={upvotes}
        downvotes={downvotes} />
      </div>
      
      <Link to={`/question/answer?questId=${questionId}`} className='question__content'>

        <div className='numOfAnswers'>{answerCount} answer</div>
        <h3>{title}</h3>
        <p>{truncate(description, 140)}</p>
        
      </Link>
      <ArrowForwardIosIcon className='forwardIcon'/>
      
    </div>
  )
}

export default Question