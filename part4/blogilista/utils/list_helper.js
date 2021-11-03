const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const blogLikes = blogs.map(blog => blog.likes)
  const index = blogLikes.indexOf(Math.max(...blogLikes))
  return blogs[index]
    ? blogs[index]
    : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
