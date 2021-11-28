listHelper = require('../utils/list_helper')
variables = require('./test_variables')

describe('author with most blogs', () => {

  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test("when list has only one blog is blog's author", () => {
    expect(listHelper.mostBlogs(variables.listWithOneBlog)).toEqual({'author': 'Edsger W. Dijkstra', 'blogs' : 1})
  })

  test('of a bigger list is correct', () => {
    expect(listHelper.mostBlogs(variables.blogs)).toEqual({'author': 'Robert C. Martin', 'blogs': 3})
  })
})