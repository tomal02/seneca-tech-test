import { useState } from 'react';

import './App.css';
import Question from './components/Question/Question';
import mockQuestions from './mocks/questions';

function App() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * mockQuestions.length));

  function getNewQuestionIndex() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * mockQuestions.length);
    } while (newIndex === currentIndex); // stops the same question appearing twice in a row
    return newIndex;
  }

  function handleShuffle() {
    setCurrentIndex(getNewQuestionIndex());
  }

  return (
    <>
      <Question question={mockQuestions[currentIndex].question} answers={mockQuestions[currentIndex].answers} onShuffle={handleShuffle} />
    </>
  )
}

export default App;
