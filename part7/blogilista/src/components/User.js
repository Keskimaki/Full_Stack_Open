import { useParams } from "react-router"
import { useSelector } from "react-redux"

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.filter(user => user.id === id)[0]
  
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name ? user.name : user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>
    </div>
  )
}

export default User