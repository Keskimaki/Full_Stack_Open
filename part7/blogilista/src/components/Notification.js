import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return <h3>{notification}</h3>

  /*if (notification === null) {
    return null
  }
  return (
    <h3>{notification}</h3>
  )*/
}

export default Notification