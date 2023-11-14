import './Home.css'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';


const Home = () => {
    
  const [userData, setUserData] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUserData({
            token: '',
            user: ''
        });
    }


  useEffect(() => {
      if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className='Home'>
      <div className='welcome__wrapper'>
      <Link to="/askQuestion" ><button>Ask Question</button></Link>
        <h2>Welcome: {userData.user?.display_name}</h2>
      </div>
      <div className='questionsAsked'>
        <h2>Questions</h2>

          <Question/>
      </div>
    </div>
  )
}

export default Home