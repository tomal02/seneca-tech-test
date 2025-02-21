import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

import AnswerToggle from '../AnswerToggle/AnswerToggle';
import './Question.css';

interface Answer {
  options: string[];
  correct: string;
}

interface QuestionProps {
  question: string;
  answers: Answer[];
  onShuffle: () => void;
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

function Question({ question, answers, onShuffle }: QuestionProps) {
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

  function isCorrectAndComplete() { //TODO! merge scoring functions into one
    return shuffledAnswers.every((answer, index) => selectedAnswers[index] === answer.correct);
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
      <motion.button
      className='shuffle-button'
      onClick={onShuffle}
      whileHover={{
        rotate: [0, 5, -5, 5, -5, 0],
        transition: { duration: 0.5, repeat: Infinity },
      }}
      >
        Shuffle
      </motion.button>
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