import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = ({ user, blogs, setBlogs, visibilityToggler }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const token = `bearer ${user.token}`
      const blog = await blogService.createBlog(token, title, author, url)
      setBlogs(blogs.concat(blog))
      //setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`))
      setTitle('')
      setAuthor('')
      setUrl('')
      visibilityToggler()
      /*setTimeout(() => {
        dispatch(removeNotification())}, 2000)*/
    } catch {
      console.log('error')
      /*setNotification('fill the missing inputs')
      setTimeout(() => {
        setNotification(null)}, 2000)*/
    }
  }

  return (
    <div>
      <form onSubmit={handleBlogCreation}>
        <>title: </>
        <input
          className="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)} /> <br />
        <>author: </>
        <input
          className="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)} /> <br />
        <>url: </>
        <input
          className="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)} /> <br />
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog