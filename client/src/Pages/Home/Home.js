import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';
import axios from 'axios';


const Home = () => {
    
  const [userData, setUserData] = useContext(UserContext);

  const [questions, setQuestions] = useState([]);

    const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {

      await axios.get('http://localhost:4000/api/questions')
        .then((res) => {setQuestions(res.data)})
        .catch((err) => {
          console.log('problem ==>', err.response.data.msg);
        });
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
      if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className='Home'>
      <div className='welcome__wrapper'>
        <Link to="/askQuestion" >
          <button>Ask Question</button>
        </Link>
        <h2>Welcome: {userData.user?.display_name}</h2>
      </div>
      <div className='questionsAsked'>
        <h2>Questions</h2>
        
        {questions?.data?.map((ques) => {
          return(
            <Question 
              title={ques.question_title}
              description={ques.question_description}
              userName={ques.user_name}
              questionId={ques.question_id}
              key={ques.question_id}
              />
          )
        })}
      </div>
    </div>
  )
}

export default Home