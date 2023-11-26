import React, { useEffect, useState } from 'react'
import './AnswerComp.css'
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import TimeLapsed from '../TimeLapsed/TimeLapsed';
import axios from 'axios';

function AnswerComp({userId, userName, answer, answerId, upvotes, downvotes, createdAt}) {
  
  
  const [profilePicture, setProfilePicture] = useState();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

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
    <div className='AnswerComp'>
      <div className='userInfo'>
        <img src={profilePicture || `https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png`} />
        <p>{userName}</p>
      </div>
      
      <div className='voteWrapper'>
        <Vote
        route='answers' 
        instanceId={answerId}
        upvotes={upvotes}
        downvotes={downvotes} />
      </div>
      
      <Link to={`/question/answer?ansId=${answerId}`}className='answer__content'>
        <p>{truncate(answer, 300)}</p>
        
      </Link>
      
      <div className='time__lapsed'><TimeLapsed createdAt={createdAt}/></div>

    </div>
  )
}

export default AnswerComp