import axios from 'axios'
const url = '/api/persons'

const getData = () => {
  const response = axios.get(url)  
  return response.then(response => response.data)
}

const addData = (data) => {
  const response = axios.post(url, data)
  return response.then(response => response.data)
}

const deleteData = (id) => {
  const response = axios.delete(`${url}/${id}`)
  return response.then(response => response.data)
}

const replaceData = (id, newData) => {axios.put(`${url}/${id}`, newData)}

const dataService = { getData, addData, deleteData, replaceData }

export default dataService
