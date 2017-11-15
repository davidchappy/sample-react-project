import React from 'react'
import './Notification.css'

// Layout component only
const Notification = props => (
  <div className={`Notification ${props.className}`}>
    {props.children}
  </div>
)

export default Notification
  
