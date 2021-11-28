import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from "./Todo"

test('<Todo /> renders text properly', () => {
  const todo = {
    text: 'Learn about containers',
    done: true
  }

  const component = render(<Todo todo={todo} onClickComplete={jest.fn()} onClickDelete={jest.fn()} /> )
  
  expect(component.container).toHaveTextContent(
    'Learn about containers'
  )
})