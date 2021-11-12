import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import Users from './components/Users'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect( async () => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      dispatch(loginUser(user))
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
      dispatch(loginUser(user))
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(logoutUser())
    
  }

  const BlogList = () => {
    return (
      <div>
        <h2>create new</h2>
        <Togglable buttonLabel="create new blog" ref={createBlogRef}>
          <CreateBlog visibilityToggler={visibilityToggler} />
        </Togglable>
        {blogs
          .sort((a, b) => (
            b.likes - a.likes))
          .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  }
  

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
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
      <Notification />
      <Logout handleLogout={handleLogout} />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App