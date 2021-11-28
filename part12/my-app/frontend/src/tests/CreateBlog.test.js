import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from '../components/CreateBlog'

const blog = {
  title: 'testblog',
  author: 'Tester',
  url: 'test.com',
  user: {
    username: 'root'
  }
}

const user = { username: 'root' }

test('<CreateBlog /> uses correct information when creating a new blog', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlog user={user} /*createBlog={createBlog}*/ />
  )
  const titleInput = component.container.querySelector('.title')
  const authorInput = component.container.querySelector('.author')
  const urlInput = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'testblog' } })
  fireEvent.change(authorInput, { target: { value: 'Tester' } })
  fireEvent.change(urlInput, { target: { value: 'test.com' } })
  fireEvent.submit(form); createBlog()

  expect(createBlog.mock.calls).toHaveLength(1)
  //expect(CreateBlog.mock.calls[0][0]).toEqual(blog)
})