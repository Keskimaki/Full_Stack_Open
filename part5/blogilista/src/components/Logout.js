import react from "react"
const Logout = ({ user, handleLogout}) => (
  <p>
    <>{user.name ? user.name : user.username} logged in </>
    <button onClick={handleLogout}>logout</button>
  </p>
)

export default Logout