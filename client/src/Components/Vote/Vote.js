import React, { useContext, useEffect, useState } from 'react'
import './Vote.css'
import { UserContext } from '../../Context/UserContext';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import axios from 'axios';

function Vote({instanceId, upvotes, route, downvotes, style}) {

  const [userData, setUserData] = useContext(UserContext);
  const [vote, setVote] = useState(0);

  
  // const [vote, setVote] = useState((upvotes ? upvotes.length : 0) - (downvotes ? downvotes.length : 0));

  const [ lockUpVote, setLockUpVote] = useState(false);
  const [ lockDownVote, setLockDownVote] = useState(false);

  const id = userData?.user?.id;
  const voteUpdate = {
    userId: userData?.user?.id,
    ...(route === 'questions' ? { questionId: instanceId } : { answerId: instanceId })
  };
  

  const checkVote = () => {
    if (upvotes && upvotes.includes(id)) {
      setLockUpVote(true);
    }
    if (downvotes && downvotes.includes(id)) {
      setLockDownVote(true);
    }  
  }

  const handleVote = async (type) => {

    await axios.put(`http://localhost:4000/api/${route}/vote?type=${type}`, voteUpdate)
    .then((res) => {setVote(res.data.count)})
    .then(() => {
      if (type === 'up'){
        setLockUpVote(true);
        setLockDownVote(false);
      }
      if (type === 'down'){
        setLockUpVote(false);
        setLockDownVote(true);
      }})
    .catch((err) => {
        console.log('problem ==>', err.response.data.msg);
      });
  };
  
  // console.log(vote);
  // console.log(upvotes);
  // console.log(downvotes);

  useEffect(() => {
    const upvotesCount = upvotes ? upvotes.length : 0;
    const downvotesCount = downvotes ? downvotes.length : 0;
    const newVote = upvotesCount - downvotesCount;
    setVote(newVote);
    checkVote();
  }, [upvotes, downvotes]);
  

  return (
    <div className={`'reaction__wrapper' ${style==='triangle' ? 'reaction__wrapper2' : ''}`}>

      <div onClick={() => handleVote('up')} disabled={lockUpVote}>
        <ArrowBackIosNewSharpIcon className={`upVote ${lockUpVote && 'lockedVote'} ${style==='triangle' ? 'upVote2' : ''}`} fontSize='large'/>
      </div>

      <div className={`reaction__count ${style==='triangle' ? 'reaction__count2' : ''}`}>{vote !== undefined ? vote : 0}</div>

      <div onClick={() => handleVote('down')} disabled={lockDownVote}>
        <ArrowBackIosNewSharpIcon className={`downVote ${lockDownVote && 'lockedVote'} ${style==='triangle' ? 'downVote2' : ''}`} fontSize='large'/>
      </div>         

    </div>
  )
}

export default Vote