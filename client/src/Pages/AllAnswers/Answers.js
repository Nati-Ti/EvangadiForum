import React, { useContext, useEffect, useState } from 'react'
import './Answers.css'
import AnswerComp from '../../Components/Answer/AnswerComp'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import Vote from '../../Components/Vote/Vote';
import TimeLapsed from '../../Components/TimeLapsed/TimeLapsed';
import EditQuestion from '../../Components/EditQuestion/EditQuestion';

function Answers() {

  const [userData, setUserData] = useContext(UserContext);
  // Get the location object using useLocation
  const location = useLocation();
  // Create a URLSearchParams object from the location search string
  const searchParams = new URLSearchParams(location.search);
  // Get the value of the 'q' query parameter
  const questionId = searchParams.get('questId');
  const userId = userData.user ? userData.user.id : null;

  const [answers, setAnswers] = useState([]);
  const [questionInfo, setQuestionInfo] = useState([]);
  
  const [answer, setAnswer] = useState({});
  const navigate = useNavigate();

  const [userQuestion, setUserQuestion] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [editSection, setEditSection] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);


  async function fetchQuestionInfo() {
    try {
      const response = await axios.get(`http://localhost:4000/api/questions/questionInfo?questionId=${questionId}`);
      setQuestionInfo(response.data);
    } catch (error) {
      console.log('Error fetching question info:', error);
    }
  }

  useEffect(() => {
    fetchQuestionInfo();
  }, [reloadCount,questionId]);

  useEffect(() => {
    const checkUserQuestion = () => {
      if (questionInfo && questionInfo.data && questionInfo.data.user_id === userData.user.id) {
        setUserQuestion(true);
      } else {
        setUserQuestion(false);
      }
    };
    
    checkUserQuestion();
  }, [questionInfo, userId]);

  useEffect(() => {
    async function fetchAnswers () {
      await axios.get(`http://localhost:4000/api/answers/getAllAnswers?questionId=${questionId}`)
        .then((res) => {setAnswers(res.data)})
        .catch((err) => {
          console.log('problem ==>', err.response.data.msg);
        });
    }

    fetchAnswers();
  }, [questionId]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    setAnswer({ ...answer, userId: userData.user.id, questId: questionId, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/api/answers/postAnswer', answer).then(() => handleReload());

    
    // navigate(`/question/allanswers?questId=${questionId}`);
  }

  const [ display, setDisplay ] = useState(false);

  const handleDisplay = () =>{
    setDisplay(!display);
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

  const handleEdit = async () => {
    setEditSection(true);
  }
  const handleCancelEdit = () => {
    setEditSection(false);
  };

  const handleReloadCount = () => {
    setReloadCount((prevCount) => prevCount + 1);
  }

  const handleQuestionDelete = async () => {
    await axios.delete(`http://localhost:4000/api/questions/delete?questionId=${questionId}`)
    .then(() => setDeleteSuccess(true))
    .then(() => navigate('/'))
    .catch((err) => console.log("Unable to delete:", err));
  }


  return (
    <div className='Answer'>
      <div className='questionAsked'>
        <div className='questionAns__wrapper'>
          
          <div className='questionAns__header'>
            <h2 className='questionAns__title'>Question</h2>
            <button onClick={() => {handleDisplay()}} className='answerButton'>{display ? 'Hide' : "Answer"}</button>
          </div>
          
          {!editSection ? "" : <EditQuestion 
          handleEditSection={handleCancelEdit} 
          questionInfo={questionInfo.data}
          reloadCountHandler={handleReloadCount} />}

        </div>
        <div className='voteQuestion__wrapper'>
          <div className='vote__wrap'>
            <Vote 
              style='triangle'
              route='questions'
              instanceId={questionId}
              upvotes={questionInfo.data?.upvotes}
              downvotes={questionInfo.data?.downvotes}
            />  
          </div>
          
          <div className='questionTitleDescr'>
            <div className='titleTimeLaps__wrap'>
              <h3>{questionInfo.data?.question_title}</h3>
              <div className='timeLaps__wrap'>      (<TimeLapsed createdAt={questionInfo.data?.createdAt}/>)</div>      
            </div>
            
            <p>{questionInfo.data?.question_description}</p>
            
            
          </div>
          
          
        </div>

        {!userQuestion ? 
          "" : 
          <div className='questionOperations'>
            <div className='editQuestion'
            onClick={() => handleEdit()}>Edit</div>
            <div className='deleteQuestion' 
              onClick={() => handleQuestionDelete()}>Delete</div>
          </div>
        }
        
      </div>

      <form className={display ? 'answer__form' : 'answer__formHide'}>
        <h2>Answer The Top Question</h2>
        <p>Go to Question page</p>
        <textarea 
            className="answer__description"
            type="text"
            name="answer"
            onChange={handleChange}
            placeholder="Your Answer..."/>
        <button onClick={handleSubmit} className='answer__post'>Post Your Answer</button>
      </form>
      
      <div className='previous__answers'>
        <div className='ansAndNum__wrapper'>
          <h2>Answer From The Community </h2>
          <p>{answerCount} answer</p>
        </div>
        
        {answers?.data?.map((ans) => {
          return(
            <AnswerComp 
            answer={ans.answer}
            userId={ans.user_id}
            answerId={ans.answer_id}
            upvotes={ans.upvotes}
            downvotes={ans.downvotes}
            userName={ans.registration.user_name}
            createdAt={ans.createdAt}
            key={ans.answer_id}/>
          )
        })}
      </div>


    </div>
  )
}

export default Answers