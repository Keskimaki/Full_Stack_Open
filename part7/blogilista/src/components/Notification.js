import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const _notification = useSelector(state => state)

  return <h3>{_notification}</h3>

  /*if (notification === null) {
    return null
  }
  return (
    <h3>{notification}</h3>
  )*/
}

export default Notification