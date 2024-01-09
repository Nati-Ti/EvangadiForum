import React, { useEffect, useState } from 'react';
import './Answer.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Vote from '../../Components/Vote/Vote';
import Loading from '../../Components/Loading/Loading';


function Answer() {

  const location = useLocation();
  // Create a URLSearchParams object from the location search string
  const searchParams = new URLSearchParams(location.search);
  // Get the value of the 'q' query parameter
  const answerId = searchParams.get('ansId');

  const [ answer, setAnswer ] = useState();
  const [ loading, setLoading ] = useState(false);

  const fetchAnswer = async () => {
    await axios.get(`http://localhost:4000/api/answers/question/answer?ansId=${answerId}`)
    .then((res) => setAnswer(res?.data))
    .then(() => setLoading(false))
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    setLoading(true);
    fetchAnswer();
  }, [answerId]);
  
  return (
    <div className='Answer'>
      <div className='answer__wrapper'>
        <div className='answer__question'>
          <div className='question__header'>
            <h2>Question</h2>
          </div>
          {loading ? 
          <div className='answerLoading'>
            <Loading loading={loading}/>
          </div>
          :
          <div className='question__wrapper' >
            <div className='question__descr'>
              <h4>{answer?.data.question.question_title}</h4>
              <p>{answer?.data.question.question_description}</p>
            </div>
            <div className='vote__wrapper'>
              <Vote 
                style='triangle'
                route='questions'
                instanceId={answer?.data.question.question_id}
                upvotes={answer?.data.question.upvotes}
                downvotes={answer?.data.question.downvotes}
              />
            </div>       
          </div>
          }
        </div>
        <div className='answer__header'>
          <h2>Answer from: {answer?.data.registration.user_name}</h2>
        </div>
        {loading ? 
          <div className='answerLoading'>
            <Loading loading={loading}/>
          </div>
          :
        <div className='answer__content'>
          <Vote 
            route='answers'
            instanceId={answerId}
            upvotes={answer?.data.upvotes}
            downvotes={answer?.data.downvotes}
          />
          <p>{answer?.data.answer}</p>
        </div>
        }
      </div>
    </div>
  )
}


export default Answer