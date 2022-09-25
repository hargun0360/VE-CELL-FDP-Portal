import React from 'react';
import {Navigate} from 'react-router-dom';
const AdminPrivateRoute = ({ children}) => {
    const isAuthenticated = localStorage.getItem("token")?true:false;
    const is_admin = localStorage.getItem("admin")=="true" ? true :false;
    if (isAuthenticated && is_admin ) {
      return children
    }
      
    return <Navigate to="/" />
  }
export default AdminPrivateRoute;