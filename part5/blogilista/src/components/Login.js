import React from 'react'
const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      <>username </>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      /> <br />
      <>password </>
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      /> <br />
      <button type="submit">login</button>
    </form>
  </div>
)

export default Login