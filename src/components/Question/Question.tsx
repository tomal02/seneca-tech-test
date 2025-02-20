import React, {useEffect, useState} from 'react';
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

  const isCorrect = (index: number) => { //!temporary below line for testing
    return selectedAnswers[index] === answers[index].correct;
  };

  function isCorrectAndComplete(){
    return answers.every((answer, index) => selectedAnswers[index] === answer.correct); // returns true if every answer is present and correct
  }

  return (
    <div>
      <h2>Question: {question}</h2>
      {answers.map((answer, index) => (
        <div>
          <AnswerToggle options={answer.options} selected={selectedAnswers[index]} onToggle={(option) => handleToggle(index, option)} disabled={isCorrectAndComplete()}/>
          {selectedAnswers[index] !== undefined && (
            <span>{isCorrect(index) ? 'Correct' : 'Incorrect'}</span>
          )}
        </div>
      ))}
      {isCorrectAndComplete() && <span>Quiz complete!</span>}
    </div>
  );
}

export default Question;