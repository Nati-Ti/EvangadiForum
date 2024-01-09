import { useState } from 'react';
import './Topic.css';

function Topic({ onDataChange }) {
  const topics = [
    'All', 'React', 'Node', 'Typescript', 'Next', 'Tailwind', 'Git', 'MongoDB', 'CSS', 'MySql', 'Bootstrap', 'JQuery', 'Javascript', 'RESTful', 'ES6+', 'HTML', 'Express', 'C#', 'Firebase', 'SASS'
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);

  const sendDataToParent = (topic) => {
    if (onDataChange) {
      onDataChange(topic);
    }
    setSelectedTopic(topic);
  };

  return (
    <div className='topics__wrapper'>
      <ul className='topics__list'>
        {topics.map((topic,index) => (
          <li
            key={index}
            className={`topic ${selectedTopic === topic ? 'selectedTopic' : ''}`}
            onClick={() => sendDataToParent(topic)}
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topic;