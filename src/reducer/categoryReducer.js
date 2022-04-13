import { categoryType } from '../action/category/categoryType'

const initial = {
    loading: false,
    errors: [],
    categories:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initial, action) => {
        // eslint-disable-next-line default-case
    switch (action.type) {
        case categoryType.GET_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                errors:[]
            }
            break
        case categoryType.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload
            }
            break
            case categoryType.GET_CATEGORY_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    errors: action.payload
                }
            break
            case categoryType.CREATE_CATEGORY_REQUEST:
                state = {
                    ...state,
                    loading: true,
                    errors:[]
                }
                break
            case categoryType.CREATE_CATEGORY_SUCCESS:
                state = {
                    ...state,
                    loading: false
                }
                break
            case categoryType.CREATE_CATEGORY_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    errors: action.payload
                }
                break
        case categoryType.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                errors:[]
            }
            break
        case categoryType.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break
        case categoryType.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                errors: action.payload
            }
            break
        case categoryType.CATEGORY_CLEAR_ERROR:
            state = {
                    ...state,
                    errors:[]
                }
            break
        case categoryType.DELETE_CATEGORY_REQUEST:
                state = {
                    ...state,
                    loading: true,
                    errors:[]
                }
                break
        case categoryType.DELETE_CATEGORY_SUCCESS:
                state = {
                    ...state,
                    loading: false
                }
                break
        case categoryType.DELETE_CATEGORY_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    errors: action.payload
                }
                break
        
    }
    return state
}