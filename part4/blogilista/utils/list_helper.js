const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const blogLikes = blogs.map(blog => blog.likes)
  const index = blogLikes.indexOf(Math.max(...blogLikes))
  return blogs[index]
    ? blogs[index]
    : null
}

const mostBlogs = blogs => {
  const authorAmount = blogs
    .map(blog => blog.author)
      .reduce((acc, curr) => (acc[curr] = ++acc[curr] || 1, acc), {})
  const blogAuthor = Object.keys(authorAmount)
  const index = blogAuthor.length - 1
  return blogAuthor[index] 
    ? { author: blogAuthor[index], blogs: Math.max(...Object.values(authorAmount)) }
    : null
}

const mostLikes = blogs => {
  const result = blogs.filter(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
  return result[0]
    ? {author: result[0].author, likes: result[0].likes}
    : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
