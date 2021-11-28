listHelper = require('../utils/list_helper')
variables = require('./test_variables')

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(variables.listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(variables.blogs)).toBe(36)
  })
})