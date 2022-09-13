import { LOGIN_URL,REFRESH_TOKEN,SIGNUP_URL } from "./ApiUrls"
import { getAuthToken,RestAxiosService } from "./RestApiService"

// Function To Get The Refresh Token from Local Storage
export function doGetRefreshToken() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken("rtoken"),
    }
    return new Promise((resolve, reject) => {
      return RestAxiosService(REFRESH_TOKEN, "GET", false, headers).then(
        res => {
          resolve(res)
          console.log("In Refresh Token", res)
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accessToken)
          } else if (res.status === 401) {
            window.location.href = "/"
            localStorage.clear();
            return
          } else return
          console.log("response in Refresh Token :- ", res)
        },
        err => {
          reject(err)
        }
      )
    })
  }

// Login User
export function doLoginUser(credentials) {
    let headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
    return new Promise((resolve, reject) => {
      return RestAxiosService(LOGIN_URL, "POST", credentials, headers).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
  }

// Signup User
export function doSignupUser(credentials) {
    let headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
    return new Promise((resolve, reject) => {
      return RestAxiosService(SIGNUP_URL, "POST", credentials, headers).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    })
  }