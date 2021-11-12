import usersService from "../services/users"

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT USERS':
      return action.users
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch ({
      type: 'INIT USERS',
      users
    })
  }
}

export default usersReducer