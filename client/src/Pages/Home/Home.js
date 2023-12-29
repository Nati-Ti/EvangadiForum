import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';
// import axios from 'axios';


const Home = () => {
    
  const [userData, setUserData] = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const navigate = useNavigate();

  async function fetchQuestions() {
    // await axios.get('http://localhost:4000/api/questions')
    fetch('http://localhost:4000/api/questions')
      .then(response => response.json())
      .then((res) => {
        setQuestions(res.data); 
        setFilteredQuestions(res.data);})
      .catch((err) => {
        console.log('problem ==>', err.response.msg);
      });
  }
  useEffect(() => {
    fetchQuestions();
  }, []);


  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchQuestion(searchTerm);

    const filteredItems = questions.filter((question) =>
    question.question_title.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredQuestions(filteredItems);
  }

  // console.log(questions.data);
  // console.log(filteredQuestions);

  useEffect(() => {
      if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className='Home'>
      <div className='welcome__wrapper'>
        <Link to="/askQuestion" >
          <button>Ask Question</button>
        </Link>
        <div className='question__search'>
          <input
            type="text"
            value={searchQuestion}
            onChange={handleInputChange}
            placeholder='Search your question' />  
        </div>
        <h2>Welcome: {userData.user?.display_name}</h2>
      </div>
      <div className='questionsAsked'>
        <h2>Questions</h2>
        
        {filteredQuestions?.map((ques) => {
          return(
            <Question 
              title={ques.question_title}
              description={ques.question_description}
              userId={ques.registration.user_id}
              userName={ques.registration.user_name}
              questionId={ques.question_id}
              profFileName={ques.profile.profile_picture}
              upvotes={ques.upvotes}
              downVotes={ques.downVotes}
              createdAt={ques.createdAt}
              key={ques.question_id}
              />
          )
        })}
      </div>
    </div>
  )
}

export default Home