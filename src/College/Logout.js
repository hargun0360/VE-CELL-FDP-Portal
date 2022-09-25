import React from 'react'

const Logout = () => {
    let url = window.location.href
    var arr = url.split("/");
    if(arr[4]=="logout"){
        localStorage.clear();
        window.location.href="/";
    }
}

export default Logout