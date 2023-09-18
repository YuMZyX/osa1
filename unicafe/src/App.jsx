import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const header1 = 'give feedback'
  const header2 = 'statistics'

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotalGood = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAverage((updatedGood * 1 + neutral * 0 + bad * -1) / updatedTotalGood)
    setPositive((updatedGood / updatedTotalGood) * 100)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotalNeutral = updatedNeutral + good + bad
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    setAverage((updatedNeutral * 0 + good * 1 + bad * -1) / updatedTotalNeutral)
    setPositive((good / updatedTotalNeutral) * 100)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotalBad = updatedBad + good + neutral
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    setAverage((updatedBad * -1 + good * 1 + neutral * 0) / updatedTotalBad)
    setPositive((good / updatedTotalBad) * 100)
  }

  return (
    <div>
      <Header header={header1} />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <br />
      <br />
      <Header header={header2} />
      <Feedback total={total} good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

const Feedback = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics total={props.total} good={props.good} neutral={props.neutral} bad={props.bad} average={props.average} positive={props.positive} />
    </div>
  )
}

const Statistics = (props) => (
  <div>
    <table>
      <tbody>
        <StatisticLine state={props.good} text='good' />
        <StatisticLine state={props.neutral} text='neutral' />
        <StatisticLine state={props.bad} text='bad' />
        <StatisticLine state={props.total} text='all' />      
        <StatisticLine state={props.average} text='average' />
        <StatisticLine state={props.positive} text='positive' operator='%' />
      </tbody>
    </table>
  </div>
)

const StatisticLine = (props) => (
  <tr><td>
    {props.text}
  </td><td>
     {props.state} {props.operator}
  </td></tr>
)

const Header = (props) => (
  <div>
    <h1>{props.header}</h1>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App