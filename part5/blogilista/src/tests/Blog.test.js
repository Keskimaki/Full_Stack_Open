import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

const blog = {
  title: 'testblog',
  author: 'Tester',
  url: 'test.com',
  user: {
    username: 'root'
  }
}

const user = { username: 'root' }


test('<Blog /> initially renders blog title, author and not url or likes', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent('testblog Tester')
})

test('when expanded <Blog /> renderds likes and url as well', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  //component.debug()
  expect(component.container).toHaveTextContent('like root')
  //expect(component.container).toHaveTextContent('test.com 0')
})