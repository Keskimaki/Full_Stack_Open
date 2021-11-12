import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Logout = ({ handleLogout }) => {
  const user = useSelector(state => state.user)
  return (
    <p>
      <>{user.name ? user.name : user.username} logged in </>
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Logout