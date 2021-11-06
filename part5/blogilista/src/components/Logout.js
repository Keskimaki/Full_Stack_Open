import React from "react"
import PropTypes from 'prop-types'

const Logout = ({ user, handleLogout}) => (
  <p>
    <>{user.name ? user.name : user.username} logged in </>
    <button onClick={handleLogout}>logout</button>
  </p>
)

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Logout