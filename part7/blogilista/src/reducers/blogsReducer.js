import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.blogs
  case 'NEW_BLOG':
    return state.concat(action.blog)
  case 'UPDATE_BLOG':
    const blogToChange = state.find(blog => blog.id === action.blog.id)
    return state.map(blog => 
      blog.id !== action.blog.id ? blog : blogToChange
    )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs
    })
  }
}

export const addBlog = (token, title, author, url) => {
  return async dispatch => {
    const blog = await blogService.createBlog(token, title, author, url)
    dispatch({
      type: 'NEW_BLOG',
      blog
    })
  }
}

export const updateBlog = (token, blog) => {
  return async dispatch => {
    const request = await blogService.updateBlog(token, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: request
    })
  }
}

export const removeBlog = (token, id) => {
  return async dispatch => {
    await blogService.deleteBlog(token, id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

export default blogsReducer