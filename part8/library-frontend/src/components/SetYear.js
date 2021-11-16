import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries"

const SetYear = () => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  let setBornTo

  const [ newYear ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const updateAuthor = (event) => {
    event.preventDefault()

    setBornTo = Number(born)
    newYear({ variables: {name, setBornTo} })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <>name </>
          <input 
          value={name} 
          onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          <>born </>
          <input 
          value={born} 
          type='number'
          onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetYear