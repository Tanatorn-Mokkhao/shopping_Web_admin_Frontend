import axios from '../../helper/axios'
import { productType } from './productType'


export const GetProduct = (page,orderBy,search) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: productType.GET_PRODUCT_REQUEST })
            const res = await axios.get(`/products/product?limit=10&page=${page}&orderBy=${orderBy}&search=${search}`)
            if (res.status === 200) {
                const { data, filter } = res.data
                dispatch({
                    type: productType.GET_PRODUCT_SUCCESS,
                    payload: {data,filter}
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: productType.GET_PRODUCT_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const PatchProductStatus = (id,payload) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: productType.PATCH_PRODUCT_STAUTS_REQUEST })
            const res = await axios.patch(`/products/product/status/${id}`, payload)
            if (res.status === 200) {
                const { search } = window.location
                const page = new URLSearchParams(search).get("page")
                const orderBy = new URLSearchParams(search).get("orderBy")
                const searchData = new URLSearchParams(search).get("search")
                dispatch(GetProduct(page,orderBy,searchData))
                dispatch({
                    type: productType.PATCH_PRODUCT_STAUTS_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: productType.PATCH_PRODUCT_STAUTS_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const CreateProduct = (payload) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: productType.CREATE_PRODUCT_REQUEST })
            const res = await axios.post(`/products/product/`, payload)
            if (res.status === 200) {
                const { search } = window.location
                const page = new URLSearchParams(search).get("page")
                const orderBy = new URLSearchParams(search).get("orderBy")
                const searchData = new URLSearchParams(search).get("search")
                dispatch(GetProduct(page,orderBy,searchData))
                dispatch({
                    type: productType.CREATE_PRODUCT_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: productType.CREATE_PRODUCT_FAILURE,
                    payload: err.response.data
                })
                return err.response.data
            }
        }
    }
}

export const UpdateProduct = (id, payload) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: productType.PATCH_PRODUCT_REQUEST })
            const res = await axios.patch(`/products/product/${id}`, payload)
            if (res.status === 200) {
                const { search } = window.location
                const page = new URLSearchParams(search).get("page")
                const orderBy = new URLSearchParams(search).get("orderBy")
                const searchData = new URLSearchParams(search).get("search")
                dispatch(GetProduct(page,orderBy,searchData))
                dispatch({
                    type: productType.PATCH_PRODUCT_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: productType.PATCH_PRODUCT_FAILURE,
                    payload: err.response.data
                })
                return err.response.data
            }
        }
    }
}

export const ClearError = () => {
    return async dispatch => {
        dispatch({ type: productType.PRODUCT_CLEAR_ERROR })
    }
}