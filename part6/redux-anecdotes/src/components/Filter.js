import React from 'react'
import { updateFilter } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({ target }) => props.updateFilter(target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)
export default connectedFilter