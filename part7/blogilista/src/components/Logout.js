import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Logout = ({ handleLogout }) => {
  const user = useSelector(state => state.user)
  return (
    <p>
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