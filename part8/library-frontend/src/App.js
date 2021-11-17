import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    console.log(token)
    if (token) {
      setUser(true)
    }
  }, [])

  const logout = () => {
    setUser(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }
 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user 
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={()=> setPage('login')}>login</button>}
      </div>

      <Authors
        user={user}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login 
        show={page === 'login'}
        setUser={setUser}
        setPage={setPage}
      />

    </div>
  )
}

export default App