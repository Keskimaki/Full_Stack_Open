import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : anecdoteToChange
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote.content,
        id: anecdote.id,
        votes: 0
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
