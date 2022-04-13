import { authType } from './authType';
import axios from '../../helper/axios'
import { Config_ls } from '../../utils/config'

export const Login = (payload) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: authType.LOGIN_REQUEST })
            const res = await axios.post("/users/admin/login", payload)
            if (res.status === 200) {
                const { user, token } = res.data.data
                localStorage.setItem(Config_ls.userToken, token)
                localStorage.setItem(Config_ls.userData, JSON.stringify(user))
                dispatch({
                    type: authType.LOGIN_SUCCESS,
                    payload: {user,token}
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: authType.LOGIN_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}
export const Signup = (payload) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: authType.SIGNUP_REQUEST })
            const res = await axios.post("/users/admin/create", payload)
            if (res.status === 200) {
                dispatch({ type: authType.SIGNUP_SUCCESS })
                window.location.href = "/signin";
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: authType.LOGIN_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const ResponseSuccessGoogle = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authType.LOGIN_REQUEST })
            const res = await axios.post('/users/admin/hook-auth-google', payload)
            if (res.status === 200) {
                const { user, token } = res.data.data
                localStorage.setItem(Config_ls.userData, JSON.stringify(user))
                localStorage.setItem(Config_ls.userToken, token)
                dispatch({
                    type: authType.LOGIN_SUCCESS,
                    payload: {user,token}
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: authType.LOGIN_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const isLogged = () => {
    return async (dispatch) => {
        const token = localStorage.getItem(Config_ls.userToken)
        if (token) {
        const user = JSON.parse(localStorage.getItem(Config_ls.userData))
        dispatch({
          type: authType.LOGIN_SUCCESS,
          payload: {user,token}
        })
      }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({ type: authType.LOGOUT_REQUEST })
        try {
            const res = await axios.post('/users/admin/signout')
            if (res.status === 200) {
                localStorage.clear()
                dispatch({ type: authType.LOGOUT_SUCCESS })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: authType.LOGIN_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const ClearError = () => {
    return async dispatch => {
        dispatch({ type: authType.CLEAR_ERROR })
    }
}