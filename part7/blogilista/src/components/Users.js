import { useState, useEffect } from "react"
import usersService from "../services/users"

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll().then(data => setUsers(data))
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <strong>username / blogs created</strong>
      {users.map(user => 
        <div key={user.id}>
          {user.name ? user.name : user.username} {user.blogs.length}
        </div>
      )}
    </div>
  )
}

export default Users