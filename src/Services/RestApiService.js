import axios from "axios"
import { getValidatedData } from "../Validation/GetValidateData"
import { doGetRefreshToken } from "./ApiServices"

export function getAuthToken(key="token") {
    return getValidatedData(localStorage.getItem(key))
  }

export function RestAxiosService(url, method, body, headers, config) {
    let extraConfig = typeof config === "object" ? config : {}
    let options = {
      url: url,
      method: method,
      data: body,
      headers: { ...headers },
    }
    if (method.toLowerCase() === "get") {
      delete options.data
    }
    return new Promise((resolve, reject) => {
      console.log("In Rest Axios")
      return axios(Object.assign({}, options, extraConfig))
        .then(function (res) {
          if (res.status >= 200 && res.status < 300) {
            resolve({ status: res.status, data: res.data })
          } else {
            reject({ status: res.status, data: res.data })
          }
        })
        .catch(function (e) {
          console.log(e)
          if (typeof e === "object" && typeof e.response === "object") {
            if (url.indexOf("/token/refresh")===-1) {
              if (e.response.status === 401) {
                doGetRefreshToken().then(
                  res => {
                    console.log("Response in Rest Axios Refresh ", res)
                    if (res.status === 200) {
                      let headers1={...headers,Authorization:"Bearer " + getAuthToken("token")};
                      RestAxiosService(url, method, body, headers1, config).then((resX)=>{
                        resolve(resX)
                      },(errX)=>{
                        reject(errX)
                      })
                      console.log("Here! in place of rest axios")
                    } else if (res.status == 401) {
                      window.location.href = "/"
                      localStorage.clear()
                    } else return
                  },
                  err => {
                    console.log("Error in Rest Axios Refresh ", JSON.stringify(err))
                    if (err.status == 401 && (["/"].indexOf(window.location.pathname)===-1)) {
                      window.location.href = "/"
                      localStorage.clear()
                    } 
                    
                  }
                )
              } else {
                reject({ status: e.response.status, data: e.response.data })
              }
            } else {
              reject({ status: e.response.status, data: e.response.data })
            }
          } else {
            reject({ status: 532, data: "Internet Connection Failure" })
          }
        })
    })
  }