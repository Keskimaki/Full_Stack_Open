import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user }) => {
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

  const toggleDetails = () => {
    setDetails(!details)
  }

  const addLike = async () => {
    blog.likes++
    const request = await blogService.updateBlog(`bearer ${user.token}`, blog)
    return request
  }

  return (
    <div>
      <div style={hideWhenVisible} onClick={toggleDetails}>
        <>{blog.title} {blog.author} </>
        <button onClick={toggleDetails}>view</button>
      </div>  
      <div style={showWhenVisible} onClick={toggleDetails}>
        <>{blog.title} {blog.author} </>
        <button onClick={toggleDetails}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name ? blog.user.name : blog.user.username}
      </div>
    </div>
  )
}


export default Blog
