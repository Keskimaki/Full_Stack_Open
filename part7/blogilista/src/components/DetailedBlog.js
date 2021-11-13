import React, {useState} from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { updateBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"
import { removeBlog } from "../reducers/blogsReducer"
import blogService from "../services/blogs"

const DetailedBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog.id === id)[0]
  const user = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const showRemoveButton = { display: blog.user.username === user.username ? '' : 'none' }

  const addLike = async () => {
    const token = `bearer ${user.token}`
    blog.likes++
    dispatch(updateBlog(token, blog))
  }

  const handleRemoval = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const token = `bearer ${user.token}`
      dispatch(removeBlog(token, blog.id))
      dispatch(setNotification(`removed ${blog.title}`))
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a> <br />
      <>{blog.likes} likes </> 
      <button onClick={addLike}>like</button> <br />
      added by {blog.user.name || blog.user.username} <br />
      <button style={showRemoveButton} onClick={handleRemoval}>remove</button>
      <Comments blog={blog}/>
    </div>
  )
}

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    blogService.addComment(blog, comment)
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <input 
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)} />
      <button onClick={handleComment}>add a comment</button>
      <ul>
        {blog.comments.map(comment => <li key={Math.random()}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default DetailedBlog