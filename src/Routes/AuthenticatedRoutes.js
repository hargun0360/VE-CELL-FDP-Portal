import React from 'react';
import {Navigate} from 'react-router-dom';
const AuthenticatedRoutes = ({ children}) => {
    const isAuthenticated = localStorage.getItem("token")?false:true;
        
    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/form" />
  }
export default AuthenticatedRoutes;