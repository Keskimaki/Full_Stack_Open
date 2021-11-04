listHelper = require('../utils/list_helper')
variables = require('./test_variables')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})