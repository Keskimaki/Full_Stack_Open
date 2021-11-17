import React, { useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const Login = ( {show, setUser, setPage} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginQuery ] = useMutation(LOGIN)

  const login = async (event) => {
    event.preventDefault()

    const response = await loginQuery({ variables: {username, password} })
    const token = response.data.login.value
    setUser(true)
    localStorage.setItem('library-user-token', token)
    window.location.reload()
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          name
          <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login