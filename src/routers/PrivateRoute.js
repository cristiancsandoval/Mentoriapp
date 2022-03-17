import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({isAutheticaded, children}) => {
  return isAutheticaded 
    ? children
    : <Navigate to='/'/>
}

export default PrivateRoute