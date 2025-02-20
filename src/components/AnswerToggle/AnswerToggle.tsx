import React from 'react';

interface AnswerToggleProps {
  options: string[];
  selected: string;
  onToggle: (option: string) => void;
  disabled?: boolean;
}

function AnswerToggle ({options, selected, onToggle, disabled}: AnswerToggleProps) {
  return (
    <div>
      {options.map((option, index) => (
        <button
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