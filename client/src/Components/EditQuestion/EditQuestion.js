import axios from 'axios';
import './EditQuestion.css';

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';



function EditQuestion({questionInfo, handleEditSection, reloadCountHandler}) {


  const [question, setQuestion] = useState({});
  const [updateForm, setUpdateForm] = useState({});
  const location = useLocation();

  useEffect(() => {
    setQuestion(questionInfo);
    setUpdateForm({
      title: question?.question_title, 
      description: question?.question_description,
    });
    
  },[questionInfo, question]);

  const handleChange = (e) => {
    setUpdateForm({ ...updateForm,
      questionId: question.question_id,
      userId: question.user_id,
      [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
        await axios.put(`http://localhost:4000/api/questions/update`, updateForm, { timeout: 500 })
        .then(() => {
          handleEditSection();
          reloadCountHandler();
          // window.location.reload();
        });
    } catch (error) {
        console.log('problem ==>', error.response.data.msg);
    }
  }

  // console.log(updateForm);
  // console.log(questionInfo);
  // console.log(question);

  return (
    <div className='editQuestion'>
        <form className='questionForm' 
        onSubmit={handleSubmit}
        >
        <input
          className="question__title"
          type="text"
          name="title"
          value={updateForm.title}
          onChange={handleChange}
          placeholder="Title"/><br />

        <textarea
          className="question__description"
          type="text"
          name="description"
          value={updateForm.description}
          onChange={handleChange}
          placeholder="Question Descripition..."/><br />

          <button className="question__save">Save</button>
        </form>
    </div>
  
  )
}

export default EditQuestion