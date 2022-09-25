import React from 'react'
import { Navigate } from 'react-router-dom';
const Logout = () => {
    const url = window.location.href
    const newRegex = new RegExp(/logout/, "gi");
    const hasKeyWord = url.match(newRegex);
    if (hasKeyWord) {
        localStorage.clear();
        return <Navigate to="/form" />
    }
}

export default Logout