import React, {useState} from 'react';
import AnswerToggle from '../AnswerToggle/AnswerToggle';

interface Answer {
  options: string[];
  correct: string;
}

interface QuestionProps {
  question: string;
  answers: Answer[];
}

function Question ({question, answers}: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  function handleToggle(index: number, option: string){
    setSelectedAnswers(previousState => ({ ...previousState, [index]: option }));
  }

  const isCorrect = (index: number) => { //temporary below line for testing
    return selectedAnswers[index] === answers[index].correct;
  };

  return (
    <div>
      <h2>Question: {question}</h2>
      {answers.map((answer, index) => (
        <div>
          <AnswerToggle options={answer.options} selected={selectedAnswers[index]} onToggle={(option) => handleToggle(index, option)}/>
          {selectedAnswers[index] !== undefined && (
            <span>{isCorrect(index) ? 'Correct' : 'Incorrect'}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Question;