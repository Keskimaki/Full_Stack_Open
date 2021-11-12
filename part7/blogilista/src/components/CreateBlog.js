import React, { useState } from 'react'
//import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'

const CreateBlog = ({ user, visibilityToggler }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const token = `bearer ${user.token}`
    dispatch(setNotification(`a new blog ${title} by ${author} added`))
    dispatch(addBlog(token, title, author, url))
      .catch(() => {dispatch(setNotification('fill the missing inputs'))})
    setTitle('')
    setAuthor('')
    setUrl('')
    visibilityToggler()
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