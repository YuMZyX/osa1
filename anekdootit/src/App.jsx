import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(8).fill(0))

  // 8 KPL anekdootteja taulukossa välillä [0] - [7]
  const min = 0
  const max = 7

  const randomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const handleClick = () => {
    setSelected(randomNumber(min, max))
  }

  const handleVoteClick = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const getMaxIndex = (points) => {
    let maxIndex = 0
    for (let i = 1; i < points.length; i++) {
      if (points[i] > points[maxIndex]) {
        maxIndex = i
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMaxIndex(points)]}</p>
      <p>has {points[getMaxIndex(points)]} votes</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App