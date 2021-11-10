import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== null) {
    setTimeout(() => {dispatch(deleteNotification())}, 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

export default Notification