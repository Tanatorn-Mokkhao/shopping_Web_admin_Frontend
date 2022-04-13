import { productType } from '../action/product/productType'

const initial = {
    loading: false,
    errors: [],
    products: [],
    filters:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initial, action) => {
        // eslint-disable-next-line default-case
    switch (action.type) {
        case productType.GET_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
                errors:[]
            }
            break
        case productType.GET_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.data,
                filters: action.payload.filter
            }
            break
            case productType.GET_PRODUCT_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    errors: action.payload
                }
            break
            case productType.PATCH_PRODUCT_STAUTS_REQUEST:
                state = {
                    ...state,
                    loading: true,
                    errors:[]
                }
                break
            case productType.PATCH_PRODUCT_STAUTS_SUCCESS:
                state = {
                    ...state,
                    loading: false,
                }
                break
            case productType.PATCH_PRODUCT_STAUTS_FAILURE:
                    state = {
                        ...state,
                        loading: false,
                        errors: action.payload
                    }
            break
            case productType.CREATE_PRODUCT_REQUEST:
                state = {
                    ...state,
                    loading: true,
                    errors:[]
                }
                break
            case productType.CREATE_PRODUCT_SUCCESS:
                state = {
                    ...state,
                    loading: false,
                }
                break
            case productType.CREATE_PRODUCT_FAILURE:
                    state = {
                        ...state,
                        loading: false,
                        errors: action.payload
                    }
            break
            case productType.PATCH_PRODUCT_REQUEST:
                state = {
                    ...state,
                    loading: true,
                    errors:[]
                }
                break
            case productType.PATCH_PRODUCT_SUCCESS:
                state = {
                    ...state,
                    loading: false,
                }
                break
            case productType.PATCH_PRODUCT_FAILURE:
                    state = {
                        ...state,
                        loading: false,
                        errors: action.payload
                    }
            break
            case productType.PRODUCT_CLEAR_ERROR:
                state = {
                        ...state,
                        errors:[]
                    }
                break
        
    }
    return state
}