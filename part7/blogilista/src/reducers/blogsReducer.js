import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.blogs
  case 'NEW_BLOG':
    return state.concat(action.blog)
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

export default blogsReducer