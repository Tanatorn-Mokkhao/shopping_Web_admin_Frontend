import { authType } from '../action/auth/authType'

const initial = {
    token: null,
    authenticate: false,
    loading: false,
    error: [],
    user: [],
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initial, action) => {
    console.log(action)
    
    // eslint-disable-next-line default-case
    switch (action.type) {
        case authType.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authType.LOGIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true
            }
            break
        case authType.LOGIN_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break
        case authType.SIGNUP_REQUEST: 
            state = {
                ...state,
                loading: true
            }

            break
        case authType.SIGNUP_SUCCESS: 
            state = {
                ...state,
                loading: false
            }
            break
        case authType.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break
        case authType.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authType.LOGOUT_SUCCESS:
            state = {
                ...initial
            }
            break
        case authType.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break
        case authType.CLEAR_ERROR:
                state = {
                    ...state,
                    error:[]
                }
                break
    }
    return state
}
 
