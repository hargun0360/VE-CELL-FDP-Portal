export const BASE_URL = "https://college-form.azurewebsites.net/api/"

// Authentication
export const LOGIN_URL = BASE_URL + 'token/';
export const REFRESH_TOKEN = BASE_URL + 'token/refresh/';
export const SIGNUP_URL = BASE_URL + 'signup/sendotp/';
export const ADD_FDP_URL = BASE_URL + 'form/'
export const GET_ALL_FDP = BASE_URL + 'form/list/'
export const VERIFY_OTP = BASE_URL + 'signup/verify/'