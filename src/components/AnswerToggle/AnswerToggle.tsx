import React from 'react';

interface AnswerToggleProps {
  options: string[];
  selected: string;
  onToggle: (option: string) => void;
}

function AnswerToggle ({options, selected, onToggle}: AnswerToggleProps) {
  return (
    <div>
      {options.map((option, index) => (
        <button
        key={index}
        onClick={() => onToggle(option)}
        style={{fontWeight: selected === option ? 'bold' : 'normal'}} // !temporary
        >
          {option}
        </button>
      ))}
      
    </div>
  );
}

export default AnswerToggle;