listHelper = require('../utils/list_helper')
variables = require('./test_variables')

describe('author with most likes', () => {

  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test("when list has only on blog is blog's author", () => {
    expect(listHelper.mostLikes(variables.listWithOneBlog)).toEqual({'author': 'Edsger W. Dijkstra', 'likes' : 5})
  })

  test('of a bigger list is correct', () => {
    expect(listHelper.mostLikes(variables.blogs)).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 12})
  })
})