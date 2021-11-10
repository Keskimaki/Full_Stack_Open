const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const deleteNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {dispatch(deleteNotification())}, time * 1000)  }
}

export default notificationReducer