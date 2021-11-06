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

const blogService = { getAll, createBlog }

export default blogService