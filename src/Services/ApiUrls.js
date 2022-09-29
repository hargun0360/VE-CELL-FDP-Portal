export const BASE_URL = "https://college-form.azurewebsites.net/api/"

// Authentication
export const LOGIN_URL = BASE_URL + 'token/';
export const REFRESH_TOKEN = BASE_URL + 'token/refresh/';
export const SIGNUP_URL = BASE_URL + 'signup/sendotp/';
export const VERIFY_OTP = BASE_URL + 'signup/verify/'
export const RESET_PASSWORD = BASE_URL + 'reset/password/'
export const FORGOT_OTP = BASE_URL + 'reset/'
export const VERIFY_RESET_OTP = BASE_URL + 'reset/verify/'

// ---------------- FDP ---------------------------------------------------

export const ADD_FDP_URL = BASE_URL + 'form/'
export const GET_ALL_FDP = BASE_URL + 'form/list/'

// ---------------- STUDENTS --------------------------------------------------


export const ADD_BULK_STUDENT_URL = BASE_URL + 'student/import/'
export const GET_ALL_STUDENT = BASE_URL + 'student/list/'
export const DELETE_STUDENT_URL = BASE_URL + 'student'
export const ADD_STUDENT_URL = BASE_URL + 'student/'
export const GET_STUDENT_BY_ID = BASE_URL + 'student'
export const UPDATE_STUDENT_URL = BASE_URL + 'student'

// ---------------- FACULTY PARICIPATION -----------------------------------------

export const ADD_FACULTY_PARTICIPATION_URL = BASE_URL + ''
export const GET_FACULTY_PARTICIPATION_BY_ID = BASE_URL + ''
export const UPDATE_FACULTY_PARTICIPATION_URL = BASE_URL + ''
export const GET_ALL_FACULTY_PARTICIPATION = BASE_URL + ''
export const DELETE_FACULTY_PARTICIPATION_URL = BASE_URL + ''
export const ADD_BULK_FACULTY_PARTICIPATION_URL = BASE_URL + ''

// --------------------- FILTER URL -------------------------------------------------


export const STUDENT_FILTER_URL = BASE_URL + 'student/'
export const FDP_FILTER_URL = BASE_URL + 'student/'
export const FACULTY_PARTICIPATION_FILTER_URL = BASE_URL + 'student/'
