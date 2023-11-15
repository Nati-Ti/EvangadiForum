import React, { useContext, useEffect, useState } from 'react'
import './Answer.css'
import AnswerComp from '../../Components/Answer/AnswerComp'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

function Answer() {

  // const { questionId } = useParams();

  // Get the location object using useLocation
  const location = useLocation();
  // Create a URLSearchParams object from the location search string
  const searchParams = new URLSearchParams(location.search);
  // Get the value of the 'q' query parameter
  const questionId = searchParams.get('questId');

  const [answers, setAnswers] = useState([]);
  const [questionInfo, setQuestionInfo] = useState([]);

  useEffect(() => {
    async function fetchQuestionInfo () {
      await axios.get(`http://localhost:4000/api/questions/questionInfo?questionId=${questionId}`)
        .then((res) => {setQuestionInfo(res.data)})
        .catch((err) => {
          console.log('problem ==>', err.response.data.msg);
        });
    }

    fetchQuestionInfo();
  }, []);

  useEffect(() => {

    async function fetchAnswers () {

      await axios.get(`http://localhost:4000/api/answers/getAllAnswers?questionId=${questionId}`)
        .then((res) => {setAnswers(res.data)})
        .catch((err) => {
          console.log('problem ==>', err.response.data.msg);
        });
    }

    fetchAnswers();
  }, []);


  
  const [answer, setAnswer] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswer({ ...answer, userId: userData.user.id, questId: questionId, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/api/answers/postAnswer', answer);

    // navigate(`/answer/answer?quesId=${questionId}`);
  }



  return (
    <div className='Answer'>
      <div className='questionAsked'>
        <h2>Question</h2>
        <h4>{questionInfo.data?.question_title}</h4>
        <p>{questionInfo.data?.question_description}</p>
      </div>

      
      <div className='previous__answers'>
        <h2>Answer From The Community</h2>
        {answers?.data?.map((ans) => {
          return(
            <AnswerComp 
            answer={ans.answer}
            userName={ans.user_name}
            key={ans.answer_id}/>
          )
        })}
        
      </div>

      <form className='answer__form' onSubmit={handleSubmit}>
        <h2>Answer The Top Question</h2>
        <p>Go to Question page</p>
        <textarea 
            className="answer__description"
            type="text"
            name="answer"
            onChange={handleChange}
            placeholder="Your Answer..."/>
        <button className='answer__post'>Post Your Answer</button>
      </form>
    </div>
  )
}

export default Answer