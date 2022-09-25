import React from 'react'

const Logout = () => {
    const url = window.location.href
    const newRegex = new RegExp(/logout/, "gi");
    const hasKeyWord = url.match(newRegex);
    if (hasKeyWord) {
        localStorage.clear();
        window.location.href = "/";
    }
}

export default Logout