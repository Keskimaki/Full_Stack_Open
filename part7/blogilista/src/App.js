import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import DetailedBlog from './components/DetailedBlog'
import User from './components/User'
import Users from './components/Users'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { Routes, Route } from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect( async () => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
        <Togglable buttonLabel="create new" ref={createBlogRef}>
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
      <div className="container">
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
    <div className="container">
      <Logout handleLogout={handleLogout} />
      <Notification />
      <h2>blog app</h2>
      <Routes>
        <Route path="/blogs/:id" element={<DetailedBlog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App