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

export enum CorrectnessLevel {
  Correct = "correct",
  MostlyCorrect = "mostly-correct",
  PartiallyCorrect = "partially-correct",
  Incorrect = "incorrect",
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

  function calculateScore(){
    let currentPoints = answers.reduce((score, answer, index) => {
      return score + (selectedAnswers[index] === answer.correct ? 1 : 0);
    }, 0);
    let availablePoints = answers.length;

    return [currentPoints, availablePoints];
  }

  function calculateCorrectnessLevel(){
    let [currentPoints, availablePoints] = calculateScore();
    let percentage = currentPoints / availablePoints * 100;

    if (percentage === 100) return CorrectnessLevel.Correct;
    if (percentage >= 75) return CorrectnessLevel.MostlyCorrect;
    if (percentage >= 50) return CorrectnessLevel.PartiallyCorrect;
    return CorrectnessLevel.Incorrect;
  }

  return (
    <div>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <div key={index}>
          <AnswerToggle
          options={answer.options}
          selected={selectedAnswers[index]}
          onToggle={(option) => handleToggle(index, option)}
          disabled={isCorrectAndComplete()}
          correctnessLevel={calculateCorrectnessLevel()}
          />
          {selectedAnswers[index] !== undefined && (
            <span>{isCorrect(index) ? 'Correct' : 'Incorrect'}</span>
          )}
        </div>
      ))}
      <h2>
        The answer is {isCorrectAndComplete() && <span>correct!</span> || <span>incorrect</span>}
      </h2>
    </div>
  );
}

export default Question;