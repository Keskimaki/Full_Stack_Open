import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries"
import Select from 'react-select'

const SetYear = ( {show, authors} ) => {
  const [ select, setSelect ] = useState('')
  const [ born, setBorn ] = useState('')

  let options = []
  for (let i = 0; i < authors.length; i++) {
    options = options.concat({ value: authors[i].name, label: authors[i].name})
  }
  let setBornTo
  let name

  const [ newYear ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const updateAuthor = (event) => {
    event.preventDefault()
    name = select.value
    setBornTo = Number(born)
    newYear({ variables: {name, setBornTo} })

    setSelect('')
    setBorn('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <Select 
          options={options}
          onChange={setSelect} />
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