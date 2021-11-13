import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Logout = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  const style = {
    padding: 10,
    backgroundColor: 'grey'
  }

  return (
    <p style={style}>
      <><Link to="/">blogs</Link> </>
      <><Link to="/users">users</Link> </>
      <>{user.name ? user.name : user.username} logged in </>
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default Logout