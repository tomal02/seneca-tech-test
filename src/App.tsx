import './App.css'
import Question from './components/Question/Question'

import mockQuestions from './mocks/questions'


function App() {
  const allQuestionsData = mockQuestions
  return (
    <>
      <Question question={allQuestionsData[0].question} answers={allQuestionsData[0].answers}/>
    </>
  )
}

export default App
