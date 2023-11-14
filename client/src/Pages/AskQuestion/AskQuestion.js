import React from 'react'
import './AskQuestion.css'

function AskQuestion() {
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
          <form className='questionForm'>
            <h2>Ask a public question</h2>
            <p>Go to Question page</p>

            <input
              className="question__title"
              type="text"
              name="title"
              // onChange={handleChange}
              placeholder="Title"/><br />

            <textarea
                className="question__description"
                type="text"
                name="description"
                // onChange={handleChange}
                placeholder="Question Descripition..."/><br />

            <button className="question__post">Post Your Question</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion