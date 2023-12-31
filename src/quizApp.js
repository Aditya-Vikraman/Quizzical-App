import React from "react";

import Question from "./components/question";

import Options from "./components/options"

export default function QuizApp () {
  const [questionsData, setQuestionsData] = React.useState ([])

  const [result, setResult] = React.useState(0)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setQuestionsData(data.results))
  },[result])
  
  const [questions, setQuestions] = React.useState ([])

  function startGame () {
    setResult(0)
    setQuestions (questionsData.map((item, index) => {
      const randomNumber = Math.floor(Math.random()*4);
      const choisesArray = item.incorrect_answers.filter((answer) => answer !== item.correct_answer );
      choisesArray.splice(randomNumber, 0, item.correct_answer);
      return({
        qid: index,
        question: item.question,
        answer: item.correct_answer,
        choises: choisesArray,
        selected: "",
        finished: false
      })
    }))
  }
 
  function selectAnswers (value, qID) {
    setQuestions(prevState => prevState.map(item => {
      return item.qid === qID ? {...item, selected: value} : item 
    }))
  }  

  function checkAnswers () {
    setResult(1)
    questions.map((item) => {
      item.answer === item.selected && setResult(prevValue => prevValue +1)
    })
    setQuestions(prevValue => prevValue.map((item) => {
      return {...item, finished: true}
    }))
  }

  const qAndAComponents = questions.map((item) => {
    return (
      <div className="questions-container">
        <Question key={item.qid} question={item.question}/>
        <div className="options-container">
          <Options
            qid={item.qid}
            choises={item.choises} 
            selected={item.selected}
            handleClick={selectAnswers}
            finish={item.finished}
            answer={item.answer}
          /> 
        </div>
      </div>
    )
  })

  return (
    <main>
      <div className="start-screen">
        <h1>Quizzical</h1>
      </div>
      {qAndAComponents}
      <div className="bottom-section">
      {questions.length === 0 &&
        <button 
          className="start-button" 
          onClick={startGame} 
        >
          New Game
        </button>}

        {result > 0 && 
        <div className="result">
          You Scored {(result - 1)}/10 correct answers   
        </div>}

        {questions.length > 0 && result === 0 && 
        <button 
          className="start-button" 
          onClick={checkAnswers}
        >
          Check Answers
        </button>}

        {result > 0 && 
        <button 
          className="start-button"
          onClick={startGame}
        >
          Play Again
          </button>}
      </div>
    </main>
  )
}