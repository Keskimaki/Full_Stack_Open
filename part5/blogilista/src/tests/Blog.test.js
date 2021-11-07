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

  expect(component.container).toHaveTextContent('like root')
})

test('if <Blog /> like button pressed twice event handler called twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} /*addLike={mockHandler}*/ />
  )

  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton); mockHandler()
  fireEvent.click(likeButton); mockHandler()

  expect(mockHandler.mock.calls).toHaveLength(2)
})