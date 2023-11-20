import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext';
import Question from '../../Components/Question/Question';
import axios from 'axios';
import './MyQuestion.css';

function MyQuestion() {

  const [userData, setUserData] = useContext(UserContext);
  const [ myQuestions, setMyQuestions ] = useState([]);

  useEffect(() => {

    async function fetchMyQuestions () {

      const userId = userData.user.id;
      await axios.get(`http://localhost:4000/api/questions/getMyQuestions?userId=${userId}`)
        .then((res) => {setMyQuestions(res.data)})
        .catch((err) => {
          console.log('problem ==>', err.response.data.msg);
        });
    }

    fetchMyQuestions();
  }, []);


  return (
    <div className='MyQuestion'>
      <div className='questionsAsked'>
        <h2>Your Questions</h2>
        {myQuestions?.data?.map((ques) => {
            return(
              <Question 
                title={ques.question_title}
                description={ques.question_description}
                userName={userData.user?.display_name}
                questionId={ques.question_id}
                upvotes={ques.upvotes}
                downvotes={ques.downvotes}
                key={ques.question_id}
                />
            )
          })}
      </div>
    </div>
  )
}

export default MyQuestion