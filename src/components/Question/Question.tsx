import React, {useState} from 'react';
import AnswerToggle from '../AnswerToggle/AnswerToggle';

interface Answer {
  options: string[];
  correct: string;
}

interface QuestionData {
  question: string;
  answers: Answer[];
}

interface QuestionProps {
  questionData: QuestionData;
}

function Question ({questionData}: QuestionProps) {
  console.log(questionData)
  return (
    <div>
      <h2>Question: {questionData.question}</h2>
    </div>
  );
}

export default Question;