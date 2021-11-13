import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    border: 'solid',
    borderWidth: 1
  }

  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>
        <>{blog.title} {blog.author} </>
      </Link>
    </div>
  )
}


export default Blog
