import { LOGIN_URL,REFRESH_TOKEN,SIGNUP_URL,ADD_FDP_URL, GET_ALL_FDP, VERIFY_OTP, RESET_PASSWORD, FORGOT_OTP, VERIFY_RESET_OTP, ADD_BULK_STUDENT_URL,GET_ALL_STUDENT,DELETE_STUDENT_URL,UPDATE_STUDENT_URL,ADD_STUDENT_URL,GET_STUDENT_BY_ID } from "./ApiUrls"
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

// OTP Forgot
export function doVerifyOtp(credentials) {
    let headers = {
      "Content-Type": "application/json",
    }
    return new Promise((resolve, reject) => {
      return RestAxiosService(FORGOT_OTP, "POST", credentials, headers).then(
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

// Reset Password
export function doResetPassword(new_pass) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(RESET_PASSWORD, "PATCH", new_pass, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// Update Details
export function doUpdateDetails(details,id) {
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(ADD_FDP_URL + `${id}/`, "PATCH", details, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}


// Get all FDP
export function doGetAllFDP() {
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(GET_ALL_FDP, "GET", false, headers).then((res) => {
      console.log("Get Users Response :- ", res);
      resolve(res)
    }, (err) => {
      reject(err);
    })
  })
}

// Verify User
export function doVerifyUser(credentials) {
  let headers = {
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(VERIFY_OTP , "POST", credentials, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// Verify Reset OTP
export function doVerifyResetOtp(credentials) {
  let headers = {
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(VERIFY_RESET_OTP , "POST", credentials, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// GET Detail by Id
export function doGetDetailById(id) {
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(
      ADD_FDP_URL + `${id}/` ,
      "GET",
      false, 
      headers
    ).then(
      res => {
        console.log("Get User Response :- ", res)
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// DELETE FDP by Id
export function doDeleteFDPById(id) {
  // console.log(id)
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(
      ADD_FDP_URL + `${id}/`,
      "DELETE",
      false,
      headers
    ).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// ---------------------------------------------------------------------------------------

// Add Bulk Student Details
export function doAddBulkStudentDetails(details) {
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(ADD_BULK_STUDENT_URL, "POST", details, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// Get all Students
export function doGetAllStudent() {
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(GET_ALL_STUDENT, "GET", false, headers).then((res) => {
      console.log("Get Users Response :- ", res);
      resolve(res)
    }, (err) => {
      reject(err);
    })
  })
}

// DELETE Student by Id
export function doDeleteStudentById(id) {
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(
      DELETE_STUDENT_URL + `/${id}/`,
      "DELETE",
      false,
      headers
    ).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// Add Student Details
export function  doAddStudentDetail(details) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(ADD_STUDENT_URL, "POST", details, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// Update Student Details
export function doUpdateStudentDetail(details,id) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(UPDATE_STUDENT_URL + `/${id}/`, "PATCH", details, headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// GET Student Detail by Id
export function doGetStudentDetailById(id) {
  let headers = {
    Authorization: "Bearer " + getAuthToken(),
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return RestAxiosService(
      GET_STUDENT_BY_ID + `/${id}/`,
      "GET",
      false, 
      headers
    ).then(
      res => {
        console.log("Get User Response :- ", res)
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}