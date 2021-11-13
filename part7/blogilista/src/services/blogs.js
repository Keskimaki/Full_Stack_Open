import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (token, title, author, url) => {
  const request = axios.post(baseUrl, { title, author, url }, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const updateBlog = (token, blog) => {
  const newBlog = {
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, newBlog, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const deleteBlog = (token, id) => {
  const request = axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const addComment = (blog, comment) => {
  blog.comments = blog.comments.concat(comment)
  delete blog.user
  //console.log(JSON.stringify(blog))
  const request = axios.post(`${baseUrl}/${blog.id}/comments`, blog)
  return request.then(response => response.data)
}

const blogService = { getAll, createBlog, updateBlog, deleteBlog, addComment }

export default blogService