import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Users = () => {
  const users = useSelector(state => state.users)

    const style = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    border: 'solid',
    borderWidth: 1
  }

  return (
    <div>
      <h2>Users</h2>
      <strong>username / blogs created</strong>
      {users.map(user => 
        <div key={user.id} style={style}>
        <Link to={`/users/${user.id}`} >
          {user.name ? user.name : user.username} {user.blogs.length}
        </Link> 
        </div>
      )}
    </div>
  )
}

export default Users