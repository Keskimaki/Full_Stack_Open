import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad}) => {
    const all = good + neutral + bad
  if (all !== 0) {
    return (
      <table><tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={`${good / all * 100} %`} />
      </tbody></table>
    )
  } else { 
      return <p>No feedback given</p>
    }
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr> 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App