import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  /*const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }*/
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        <>{blog.title} {blog.author} </>
      </Link>
    </div>
  )
}


export default Blog
