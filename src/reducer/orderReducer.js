import { orderType } from '../action/order/orderType'

const initial = {
    loading: false,
    errors: [],
    orders: [],
    filters:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initial, action) => {
    // eslint-disable-next-line default-case
switch (action.type) {
    case orderType.GET_ORDER_REQUEST: 
        state = {
            ...state,
            loading: true,
            errors:[]
        }
        break
    case orderType.GET_ORDER_SUCCESS:
        state = {
            ...state,
            loading: false,
            orders: action.payload.data,
            filters: action.payload.filter
        }
        break
    case orderType.GET_ORDER_FAILURE:
        state = {
            ...state,
            loading: false,
            errors: action.payload
        }
        break
    case orderType.PATCH_ORDER_ACCEPT_REQUEST:
        state = {
            ...state,
            loading: true,
            errors:[]
        }
        break
    case orderType.PATCH_ORDER_ACCEPT_SUCCESS:
        state = {
            ...state,
            loading: false
        }
        break
    case orderType.PATCH_ORDER_ACCEPT_FAILURE:
        state = {
            ...state,
            loading: false,
            errors: action.payload
        }
        break
        case orderType.PATACH_CANCLE_ORDER_REQUEST:
        state = {
            ...state,
            loading: true,
            errors:[]
        }
        break
    case orderType.PATACH_CANCLE_ORDER_SUCCESS:
        state = {
            ...state,
            loading: false
        }
        break
    case orderType.PATACH_CANCLE_ORDER_FAILURE:
        state = {
            ...state,
            loading: false,
            errors: action.payload
        }
        break
}
return state
}