import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (token, title, author, url) => {
  const request = axios.post(baseUrl, { title, author, url }, { headers: { Authorization: token }})
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

  const result = axios.put(`${baseUrl}/${blog.id}`, newBlog, { headers: { Authorization: token }})
  return result.then(response => response.data)
}

const blogService = { getAll, createBlog, updateBlog }

export default blogService