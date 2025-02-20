import { useState } from 'react'

import './App.css'
import Question from './components/Question/Question'

import mockQuestions from './mocks/questions'

function App() {
  const allQuestionsData = mockQuestions
  return (
    <>
      <Question questionData={allQuestionsData[0]}/>
    </>
  )
}

export default App
