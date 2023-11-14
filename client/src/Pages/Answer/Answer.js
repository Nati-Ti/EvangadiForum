import React from 'react'
import './Answer.css'
import AnswerComp from '../../Components/Answer/AnswerComp'

function Answer() {
  return (
    <div className='Answer'>
      <div className='questionAsked'>
        <h2>Question</h2>
        <h4>What is HTML?</h4>
        <p>How does it work</p>
      </div>

      
      <div className='previous__answers'>
        <h2>Answer From The Community</h2>
        <AnswerComp/>
      </div>

      <form className='answer__form'>
        <h2>Answer The Top Question</h2>
        <p>Go to Question page</p>
        <textarea 
            className="answer__description"
            type="text"
            name="description"
            // onChange={handleChange}
            placeholder="Your Answer..."/>
        <button className='answer__post'>Post Your Answer</button>
      </form>
    </div>
  )
}

export default Answer