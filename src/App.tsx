import './App.css'
import Question from './components/Question/Question'

import mockQuestions from './mocks/questions'


function App() {
  const randomIndex = Math.floor(Math.random() * mockQuestions.length);
  const randomQuestion = mockQuestions[randomIndex];
  return (
    <>
      <Question question={randomQuestion.question} answers={randomQuestion.answers}/>
    </>
  )
}

export default App
