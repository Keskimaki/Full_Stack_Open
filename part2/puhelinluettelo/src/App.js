import React, { useEffect, useState } from 'react'
import dataService from './services/persons'

const AdditionInfo = ( {message} ) => {
  if (message === null) {
    return null
  } else {
    return <div className="add">{message}</div>
  }
}

const Filter = ( {value, handleChange} ) => <>filter shown with <input value={value} onChange={handleChange} /></>

const PersonForm = ( {addName, name, number, handleNameChange, handleNumberChange} ) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Delete = ( {value} ) => {
  const buttonClick = () => {
    if (window.confirm(`Delete ${value.name}?`)) {
      dataService.deleteData(value.id)
      window.location.reload()
    }

  }
  return (
    <button onClick={buttonClick}>delete</button>
  )
}

const Persons = ( {persons, filterValue} ) => {
  return (
    <div>
      {persons.filter(person => 
        person.name.includes(filterValue))
      .map(person => 
        <p key={person.name}>
          {person.name} {person.number} <Delete value={person} />
        </p>
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ additionText, setAdditionText ] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    let newPerson = { name : newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        let replaceId = persons.map(person => person.name).indexOf(newName) + 1
        
        dataService.replaceData(replaceId, newPerson)
        setAdditionText(`Added ${newName}`)
        setTimeout(() => {window.location.reload()}, 1000)
      }
    } else {
      setPersons(persons.concat(newPerson))
      dataService.addData(newPerson)

      setAdditionText(`Added ${newName}`)
      setTimeout(() => {window.location.reload()}, 1000)
    }
  }

  useEffect(() => {
    dataService
      .getData()
      .then(response => {
        setPersons(response)
      })
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterValue} 
        handleChange={event => setFilterValue(event.target.value)} />

      <h2>add a new</h2>

      <PersonForm addName={addName} 
        name={newName} 
        number={newNumber} 
        handleNameChange={event => setNewName(event.target.value)} 
        handleNumberChange={event => setNewNumber(event.target.value)} />

      <h2>Numbers</h2>

      <Persons persons={persons} 
        filterValue={filterValue} />

      <AdditionInfo message={additionText}/>

    </div>
  )

}

export default App