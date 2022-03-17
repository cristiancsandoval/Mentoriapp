import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({isAuthenticaded, children}) => {
  return !isAuthenticaded
    ? children
    : <Navigate to='/monitorias'/>
}

export default PublicRoute