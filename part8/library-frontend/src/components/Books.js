import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter ] = useState(null)
  const result = useQuery(ALL_BOOKS, { variables: {genre: genreFilter}})

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  let genres = books.map(book => book.genres).flat()
  genres= new Set(genres)
  genres = Array.from(genres)

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? <p>in genre <strong>{genreFilter}</strong></p> : null}
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
    {genres.map(genre =><button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>)}
    <button onClick={()=> setGenreFilter(null)}>all genres</button>
    </div>
  )
}

export default Books