import React, { useContext, useEffect, useState } from 'react'
import './Question.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

function Question({fetchQuestions, title, description, questionId, userName, upVote, downVote}) {
  
  const [userData, setUserData] = useContext(UserContext);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const [vote, setVote] = useState(() => upVote?.length - downVote?.length);


  const [ lockUpVote, setLockUpVote] = useState(false);
  const [ lockDownVote, setLockDownVote] = useState(false);

  const id = userData?.user?.id;

  const handleUpVote = async () => {
    if (upVote.includes(id)){
      
    }
    else{
      await axios.put(`http://localhost:4000/api/questions/upVote?userId=${id}`,);
      setVote((prev) => prev+1);
    }
    fetchQuestions();
    setLockUpVote(true);
    setLockDownVote(false);
  }

  const handleDownVote = async () => {
    if (downVote.includes(id)){

    }
    else{
      await axios.put(`http://localhost:4000/api/questions/downVote?userId=${id}`,);
      setVote((prev) => prev-1);
      
    }
    fetchQuestions();
    setLockDownVote(true);
    setLockUpVote(false);
  }

  useEffect(() => {
    setVote(upVote?.length - downVote?.length);
  }, [upVote, downVote]);
  

  return (
    <div className='Question'>
      <div className='userInfo'>
        <div className='userInfo__wrapper'>
          <img src='https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png' alt='profile icon' />
          <p>{userName}</p>
        </div>
      </div>

      <div className='reaction__vote'>
        <div className='reaction__wrapper'>

          <div onClick={handleUpVote} disabled={lockUpVote}>
            <ArrowBackIosNewSharpIcon className={`upVote ${lockUpVote && 'lockedVote'}`} fontSize='large'/>
          </div>

          <div className='reaction__count'>{vote ? vote : 0}</div>

          <div onClick={handleDownVote} disabled={lockDownVote}>
            <ArrowBackIosNewSharpIcon className={`downVote ${lockDownVote && 'lockedVote'}`} fontSize='large'/>
          </div>         

        </div>
      </div>
      
      <Link to={`/question/answer?questId=${questionId}`} className='question__content'>
        <h3>{title}</h3>
        <p>{truncate(description, 140)}</p>
      </Link>
      <ArrowForwardIosIcon className='forwardIcon'/>
    </div>
  )
}

export default Question