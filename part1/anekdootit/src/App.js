import React, { useState } from 'react'

const Header = ( {text} ) => <h1>{text}</h1>

const Anecdote = ( {anecdote} ) => <>{anecdote}<br></br></>

const VoteCount = ( {votes, selected} ) => <>has {votes[selected]} votes<br></br></>

const Button = ( {handleClick, text} ) => <button onClick={handleClick}>{text}</button> 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length - 1).fill(0))

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const nextAnecdote = () => {setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))}

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <VoteCount votes={votes} selected={selected} />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[votes.indexOf(Math.max.apply(null, votes))]} />
      <VoteCount votes={votes} selected={votes.indexOf(Math.max.apply(null, votes))}/>
    </div>
  )
}

export default App