import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    } catch (exception) {
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)}, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const token = `bearer ${user.token}`
      const blog = await blogService.createBlog(token, title, author, url)
      setBlogs(blogs.concat(blog))
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)}, 2000)
    } catch {
      setNotification('fill the missing inputs')
      setTimeout(() => {
        setNotification(null)}, 2000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <Login 
        username={username} 
        password={password} 
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <Logout 
      user={user} 
      handleLogout={handleLogout}
      />
      <h2>create new</h2>
      <CreateBlog 
      title={title}
      author={author}
      urk={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      handleBlogCreation={handleBlogCreation}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App