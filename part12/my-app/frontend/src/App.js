import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

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

  const createBlogRef = useRef()
  const visibilityToggler = () => {
    createBlogRef.current.toggleVisibility()
  }

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
        handleLogout={handleLogout} />
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={createBlogRef}>
        <CreateBlog
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          visibilityToggler={visibilityToggler} />
      </Togglable>
      {blogs
        .sort((a, b) => (
          b.likes - a.likes))
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user={user}
            setNotification={setNotification}
            blogs={blogs}
            setBlogs={setBlogs} />
        )}
    </div>
  )
}

export default App