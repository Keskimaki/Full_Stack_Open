import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <strong>username / blogs created</strong>
      {users.map(user => 
        <Link to={`/users/${user.id}`} key={user.id} >
          <br /> {user.name ? user.name : user.username} {user.blogs.length}
        </Link> 
      )}
    </div>
  )
}

export default Users