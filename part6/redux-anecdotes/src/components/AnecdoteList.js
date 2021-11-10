import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())
  return (
    <div>
      {anecdotes
        .filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter))
        .sort((a, b) =>
          b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              <>has {anecdote.votes} </>
              <button onClick={() => {
                dispatch(createNotification(`you voted '${anecdote.content}'`))
                dispatch(vote(anecdote.id))
              }}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList