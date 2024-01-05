import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';
import Topic from '../../Components/Topic/Topic';
import axios from 'axios';


const Home = () => {
    
  const [userData, setUserData] = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [noMatch, setNoMatch] = useState(false);

  // const [topic, setTopic] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchQuestions() {
      // fetch('http://localhost:4000/api/questions')
      await axios.get('http://localhost:4000/api/questions')
        .then((res) => {
          setQuestions(res.data.data); 
          setFilteredQuestions(res.data.data);})
        .catch((err) => {
          console.log('problem ==>', err.response.msg);
        });
    }
    fetchQuestions();
  }, []);

  const checkMatch = (item) => {
    if(item.length === 0){
      setNoMatch(true);
    }else{
      setNoMatch(false);
    }
  }

  const handleDataChange = (topic) => {
    // setTopic(topic);
    const filteredItems = questions.filter((question) =>
    question.question_title.toLowerCase().includes((topic === 'All') ? '' : topic .toLowerCase()));

    setFilteredQuestions(filteredItems);
    checkMatch(filteredItems);
  };

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchQuestion(searchTerm);

    const filteredItems = questions.filter((question) =>
    question.question_title.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredQuestions(filteredItems);
    checkMatch(filteredItems);
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
        <h2 className='welcome__user'>Welcome: {userData.user?.display_name}</h2>
      </div>
      <div className='questionsAsked'>

        <div className='questions__header'>
          <h2>Questions</h2>
          <div className='questions__topics'>
          <Topic onDataChange={handleDataChange} />
          </div>
        </div>
        
        <div className='questions__list'>
          {!noMatch ?
          filteredQuestions.map((ques) => (
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
            )) :
            <div className='noMatch'><h2>No match found!</h2></div>
            }

        </div>
        
        {/* <div>No Question Asked!</div> */}
      </div>
    </div>
  )
}

export default Home