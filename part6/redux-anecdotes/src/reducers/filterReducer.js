const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_UPDATE':
      return action.filter
    default:
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'FILTER_UPDATE',
    filter
  }
}

export default filterReducer