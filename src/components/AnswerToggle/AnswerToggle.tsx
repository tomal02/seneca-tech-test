import './AnswerToggle.css';
import { CorrectnessLevel } from '../Question/Question';
import { motion } from 'motion/react';

interface AnswerToggleProps {
  options: string[];
  selected: string;
  onToggle: (option: string) => void;
  disabled?: boolean;
  correctnessLevel: CorrectnessLevel;
}

function AnswerToggle({options, selected, onToggle, disabled, correctnessLevel}: AnswerToggleProps) {

  // gets the index of the selected option
  const selectedIndex = options.indexOf(selected);

  return (
    <div className={`toggle-container ${correctnessLevel}`}>
      <motion.div
        initial={false}
        className="slider"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${100 / options.length}%`,
          height: '100%',
          borderRadius: '100px',
          backgroundColor: '#A5E7E2',
        }}
        animate={{
          x: `${selectedIndex * 100}%`,
          backgroundColor:
            correctnessLevel === 'incorrect'
              ? '#F8CAA3'
              : correctnessLevel === 'partially-correct'
              ? '#F2CBBD'
              : correctnessLevel === 'mostly-correct'
              ? '#a4d4a2'
              : '#A5E7E2',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {options.map((option, index) => (
        <button
          className={`toggle-button ${selected === option ? 'selected' : ''}`}
          key={index}
          onClick={() => onToggle(option)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default AnswerToggle;