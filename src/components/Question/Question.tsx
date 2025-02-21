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
  onShuffle?: () => void;
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

  // Shuffle the answers and their options
  useEffect(() => {
    const shuffled = answers.map(answer => ({
      ...answer,
      options: shuffleArray([...answer.options])
    }));
    setShuffledAnswers(shuffleArray(shuffled));
  }, [answers]);

  function handleToggle(index: number, option: string) {
    setSelectedAnswers(previousState => ({ ...previousState, [index]: option }));
  }

  // Calculates the correctness level and whether test is complete
  function calculateCorrectness() {
    let currentPoints = shuffledAnswers.reduce((score, answer, index) => {
      return score + (selectedAnswers[index] === answer.correct ? 1 : 0);
    }, 0);
    const availablePoints = shuffledAnswers.length;

    const percentage = (currentPoints / availablePoints) * 100;

    let correctnessLevel: CorrectnessLevel;
    if(percentage === 100) {
      correctnessLevel = CorrectnessLevel.Correct;
    } else if(percentage >= 65) {
      correctnessLevel = CorrectnessLevel.MostlyCorrect;
    } else if (percentage >= 32) {
      correctnessLevel = CorrectnessLevel.PartiallyCorrect;
    } else {
      correctnessLevel = CorrectnessLevel.Incorrect;
    }

    return {
      isCorrectAndComplete: currentPoints === availablePoints,
      correctnessLevel,
    };
  }

  const { isCorrectAndComplete, correctnessLevel } = calculateCorrectness();

  return (
    <div className={`question-container ${correctnessLevel}`}>
      {/* Only shows the shuffle button if shuffle handler is passed down */}
      {onShuffle ? (
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
      ) : null}
      <h1>{question}</h1>
      {shuffledAnswers.map((answer, index) => (
        <div key={index}>
          <AnswerToggle
            options={answer.options}
            selected={selectedAnswers[index]}
            onToggle={(option) => handleToggle(index, option)}
            disabled={isCorrectAndComplete}
            correctnessLevel={correctnessLevel}
          />
        </div>
      ))}
      <h2>
        The answer is {isCorrectAndComplete ? <span>correct!</span> : <span>incorrect</span>}
      </h2>
    </div>
  );
}

export default Question;