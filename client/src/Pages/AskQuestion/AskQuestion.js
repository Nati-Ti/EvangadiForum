import React, { useContext, useState } from 'react'
import './AskQuestion.css'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AskQuestion() {

  const [questionForm, setQuestionForm] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestionForm({ ...questionForm, userId: userData.user.id, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
        await axios.post('http://localhost:4000/api/questions', questionForm);

        navigate("/");
    } catch (error) {
        console.log('problem ==>', error.response.data.msg);
    }
  }

  return (
    <div className='AskQuestion'>
      <div className='askQuestion__wrapper'>
        <div className='howToAsk'>
          <h2>Steps to write a good question</h2>
          <ul>
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your Question and post it to the site.</li>
          </ul>
        </div>

        <div className='askYourQuestion'>
          <form className='questionForm' onSubmit={handleSubmit}>
            <h2>Ask a public question</h2>
            <p>Go to Question page</p>

            <input
              className="question__title"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"/><br />

            <textarea
                className="question__description"
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Question Descripition..."/><br />

            <button className="question__post">Post Your Question</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion