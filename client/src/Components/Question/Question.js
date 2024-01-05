import React, { useEffect, useState } from 'react'
import './Question.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import axios from 'axios';
import TimeLapsed from '../TimeLapsed/TimeLapsed';

function Question({userId, title, description, questionId, userName, profFileName, upvotes, downvotes, createdAt}) {
  

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const [ answerCount, setAnswerCount ] = useState(0);
  const [profilePicture, setProfilePicture] = useState();

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

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/uploads/userProfilePic?userId=${userId}`, {
          responseType: 'blob', // Ensure binary response
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchProfilePicture();
  }, []);




  return (
    <div className='Question'>
      <div className='userInfo'>
        <div className='userInfo__wrapper'>
          <img src={profilePicture || `https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png`} alt='profile icon' />
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

      <Link to={`/question/allanswers?questId=${questionId}`} className='question__content'>
        <div className='question__content__main'>
          <h3>{truncate(title, 80)}</h3>
            <p>{truncate(description, 170)}</p>

          <div className='timeAndNum__wrapper'>
              <div className='timeLapsed__wrapper'>
                <TimeLapsed createdAt={createdAt}/></div>
              <div className='numOfAnswers'>{answerCount} answer</div>
          </div>
        </div>
          
        
        <div className='forwardIcon'>
        <ArrowForwardIosIcon />
        </div>
      </Link>

    </div>
  )
}

export default Question