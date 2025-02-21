import { useState, useEffect } from 'react';
import AnswerToggle from '../AnswerToggle/AnswerToggle';
import './Question.css';

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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Question({ question, answers }: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Shuffle the answers and their options
    const shuffled = answers.map(answer => ({
      ...answer,
      options: shuffleArray([...answer.options])
    }));
    setShuffledAnswers(shuffleArray(shuffled));
  }, [answers]);

  function handleToggle(index: number, option: string) {
    setSelectedAnswers(previousState => ({ ...previousState, [index]: option }));
  }

  function isCorrectAndComplete() {
    return shuffledAnswers.every((answer, index) => selectedAnswers[index] === answer.correct); // returns true if every answer is present and correct
  }

  function calculateScore() {
    let currentPoints = shuffledAnswers.reduce((score, answer, index) => {
      return score + (selectedAnswers[index] === answer.correct ? 1 : 0);
    }, 0);
    let availablePoints = shuffledAnswers.length;

    return [currentPoints, availablePoints];
  }

  function calculateCorrectnessLevel() {
    let [currentPoints, availablePoints] = calculateScore();
    let percentage = currentPoints / availablePoints * 100;

    if (percentage === 100) return CorrectnessLevel.Correct;
    if (percentage >= 65) return CorrectnessLevel.MostlyCorrect;
    if (percentage >= 32) return CorrectnessLevel.PartiallyCorrect;
    return CorrectnessLevel.Incorrect;
  }

  return (
    <div className={`question-container ${calculateCorrectnessLevel()}`}>
      <h1>{question}</h1>
      {shuffledAnswers.map((answer, index) => (
        <div key={index}>
          <AnswerToggle
            options={answer.options}
            selected={selectedAnswers[index]}
            onToggle={(option) => handleToggle(index, option)}
            disabled={isCorrectAndComplete()}
            correctnessLevel={calculateCorrectnessLevel()}
          />
        </div>
      ))}
      <h2>
        The answer is {isCorrectAndComplete() ? <span>correct!</span> : <span>incorrect</span>}
      </h2>
    </div>
  );
}

export default Question;