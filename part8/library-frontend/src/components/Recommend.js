import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { USER_INFO, ALL_BOOKS } from '../queries'

const Recommend =  (props) => {
  const result1 = useQuery(USER_INFO)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (!result.called) {
    getBooks({variables: { genre: result1.data.me.favoriteGenre}})
  }

  if (!result.data) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{result1.data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend