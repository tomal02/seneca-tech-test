import React from 'react';
import './AnswerToggle.css';
import { CorrectnessLevel } from '../Question/Question';

interface AnswerToggleProps {
  options: string[];
  selected: string;
  onToggle: (option: string) => void;
  disabled?: boolean;
  correctnessLevel: CorrectnessLevel;
}

function AnswerToggle ({options, selected, onToggle, disabled, correctnessLevel}: AnswerToggleProps) {
  return (
    <div className={`toggle-container ${correctnessLevel}`}>
      {options.map((option, index) => (
        <button
        className={`toggle-button ${selected === option ? 'selected' : ''}`}
        key={index}
        onClick={() => onToggle(option)}
        style={{fontWeight: selected === option ? 'bold' : 'normal'}} // !temporary
        disabled={disabled}
        >
          {option}
        </button>
      ))}
      
    </div>
  );
}

export default AnswerToggle;