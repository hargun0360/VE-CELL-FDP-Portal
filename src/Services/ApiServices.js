import { LOGIN_URL,REFRESH_TOKEN,SIGNUP_URL,ADD_FDP_URL } from "./ApiUrls"
import { getAuthToken,RestAxiosService } from "./RestApiService"

// Function To Get The Refresh Token from Local Storage
export function doGetRefreshToken() {
    let headers = {
      "Content-Type": "application/json",
    }
    let data = {
      "refresh":getAuthToken("rtoken"),
    }
    return new Promise((resolve, reject) => {
      return RestAxiosService(REFRESH_TOKEN, "POST", data, headers).then(
        res => {
          resolve(res)
          console.log("In Refresh Token", res)
          if (res.status === 200) {
            console.log(res.data.access);
            localStorage.setItem("token", res.data.access)
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

  // Add Details
export function doAddDetails(details) {
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(ADD_FDP_URL, "POST", details, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}