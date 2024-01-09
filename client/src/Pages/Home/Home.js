import './Home.css'
import  React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';
import Topic from '../../Components/Topic/Topic';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Zoom } from 'react-reveal';
import Loading from '../../Components/Loading/Loading';
// import { Fade, Zoom } from 'react-reveal';


const Home = () => {
  
  const [userData, setUserData] = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumQues, setTotalNumQues] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const limit = 15;
  const offset = ((currentPage*limit)-limit);

  useEffect(() => {
    setLoading(true);
    const fetchTotalNumQuest = () => {
    axios.get(`http://localhost:4000/api/questions/total`)
      .then((res) => {
        setTotalNumQues(res.data.data);
      })
      .catch((err) => {
        console.log('problem ==>', err.response.msg);
      });
    }
    fetchTotalNumQuest();
  },[]);

  useEffect(() => {
    setNumPages(Math.ceil(totalNumQues/limit));
  }, [totalNumQues]);


  async function fetchQuestions() {
    await axios.get(`http://localhost:4000/api/questions?limit=${limit}&offset=${offset}`)
      .then((res) => {
        setQuestions(res.data.data); 
        setFilteredQuestions(res.data.data);
        setLoading(false);})
      .catch((err) => {
        console.log('problem ==>', err.response.msg);
      });
  }
  useEffect(() => {
    setLoading(true);
    fetchQuestions();
  }, [currentPage]);

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
  
  const handlePageChange = (event, page) => {
    setCurrentPage((prev) => page);
    // console.log(currentPage)
  }
  
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
        {loading ? 
        <div className="circular__progress">
          <Loading loading={loading}/>
        </div>
        :
        <div className='questions__list'>
          {!noMatch ?
          filteredQuestions.map((ques) => (
            <Zoom key={ques.question_id}>
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
              />
            </Zoom>  
            )) :
            <div className='noMatch'><h2>No match found!</h2></div>
            }

        </div>
        }
        {/* <div>No Question Asked!</div> */}
      </div>
      
      

      <div className='pagination'>
        <Pagination onChange={handlePageChange} count={numPages} color="primary" />
      </div>
    
    </div>
  )
}

export default Home