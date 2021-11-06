import React from "react"
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <h3>{notification}</h3>
  )
}

export default Notification