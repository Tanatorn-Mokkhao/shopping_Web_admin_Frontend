import axios from '../../helper/axios'
import { orderType } from './orderType'
// import axios from "axios"
import { Config_ls } from '../../utils/config'

export const GetOrder = (page,orderBy,search,state) => { 
    return async (dispatch) => { 
        try {
            dispatch({ type: orderType.GET_ORDER_REQUEST })
            // const token = window.localStorage.getItem(Config_ls.userToken)
            // const res = await axios.get(`http://localhost:3003/orders?limit=10&page=${page}&orderBy=${orderBy}&search=${search}&state=${state}`, {
            //     headers: {
            //         'Authorization': token ? `Bearer ${token}` : ''
            //     }
            // })
            const res = await axios.get(`/orders?limit=10&page=${page}&orderBy=${orderBy}&search=${search}&state=${state}`)
            if (res.status === 200) { 
                const { data, filter } = res.data
                dispatch({
                    type: orderType.GET_ORDER_SUCCESS,
                    payload: { data, filter }
                })
            }
        } catch (err) { 
            if (err.response?.status === 400) {
                dispatch({
                    type: orderType.GET_ORDER_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const PatchOrderState = (payload) => { 
    return async (dispatch) => { 
        try {
            dispatch({ type: orderType.PATCH_ORDER_ACCEPT_REQUEST })
            const res = await axios.patch('/orders/update-state', payload )
            if (res.status === 200) { 
                const { search } = window.location
                const page = new URLSearchParams(search).get("page")
                const orderBy = new URLSearchParams(search).get("orderBy")
                const searchData = new URLSearchParams(search).get("search")
                const state = new URLSearchParams(search).get("state")
                dispatch(GetOrder(page,orderBy,searchData,state))               
                dispatch({
                    type: orderType.PATCH_ORDER_ACCEPT_SUCCESS,
                })
            }
        } catch (err) { 
            if (err.response?.status === 400) {
                dispatch({
                    type: orderType.PATCH_ORDER_ACCEPT_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const PatchCancleOrderAccept = (payload) => { 
    return async (dispatch) => { 
        try {
            dispatch({ type: orderType.PATACH_CANCLE_ORDER_REQUEST })
            // const token = window.localStorage.getItem(Config_ls.userToken)
            // const res = await axios.patch(`http://localhost:3003/orders/cancle-order-accept`, payload , {
            //     headers: {
            //         'Authorization': token ? `Bearer ${token}` : ''
            //     }
            // })
            const res = await axios.patch('/orders/cancle-order-accept', payload)
            if (res.status === 200) { 
                const { search } = window.location
                const page = new URLSearchParams(search).get("page")
                const orderBy = new URLSearchParams(search).get("orderBy")
                const searchData = new URLSearchParams(search).get("search")
                const state = new URLSearchParams(search).get("state")
                dispatch(GetOrder(page,orderBy,searchData,state))       
                dispatch({
                    type: orderType.PATACH_CANCLE_ORDER_SUCCESS,
                })
            }
        } catch (err) { 
            if (err.response?.status === 400) {
                dispatch({
                    type: orderType.PATACH_CANCLE_ORDER_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}