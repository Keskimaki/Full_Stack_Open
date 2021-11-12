import React, { useState } from 'react'
//import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const dispatch = useDispatch()
  const [details, setDetails] = useState(false)

  const hideWhenVisible = { display: details ? 'none': '' }
  const showWhenVisible = {
    display: details ? '': 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveButton = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const addLike = async () => {
    const token = `bearer ${user.token}`
    blog.likes++
    dispatch(updateBlog(token, blog))
  }

  const handleRemoval = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const token = `bearer ${user.token}`
      //const request = await blogService.deleteBlog(`bearer ${user.token}`, blog.id)
      //setBlogs(blogs.filter(element => element.id !== blog.id))
      dispatch(removeBlog(token, blog.id))
      dispatch(setNotification(`removed ${blog.title}`))
      //return request
    }
  }

  return (
    <div>
      <div style={hideWhenVisible} onClick={toggleDetails}>
        <>{blog.title} {blog.author} </>
        <button onClick={toggleDetails}>view</button>
      </div>
      <div id="detailed" style={showWhenVisible} onClick={toggleDetails}>
        <>{blog.title} {blog.author} </>
        <button onClick={toggleDetails}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name ? blog.user.name : blog.user.username} <br />
        <button style={showRemoveButton} onClick={handleRemoval}>remove</button>
      </div>
    </div>
  )
}


export default Blog
