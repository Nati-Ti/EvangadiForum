import { useState } from 'react';
import './Topic.css';

function Topic({ onDataChange }) {
  const topics = [
    'All', 'React', 'Node', 'Express', 'HTML', 'CSS', 'MySql', 'Bootstrap', 'JQuery', 'Javascript', 'Node', 'Express', 'HTML'
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
        {topics.map((topic) => (
          <li
            key={topic}
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