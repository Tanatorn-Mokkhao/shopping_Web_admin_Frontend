import axios from '../../helper/axios'
import { categoryType } from './categoryType'


export const GetCategory = () => {
    return async (dispatch) => { 
        try {
            dispatch({ type: categoryType.GET_CATEGORY_REQUEST })
            const res = await axios.get("/products/category")
            if (res.status === 200) {
                const data = res.data.data
                dispatch({
                    type: categoryType.GET_CATEGORY_SUCCESS,
                    payload: data
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: categoryType.GET_CATEGORY_FAILURE,
                    payload: err.response.data
                })
            }
        }
    }
}

export const CreateCategory = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: categoryType.CREATE_CATEGORY_REQUEST })
            const res = await axios.post(`/products/category/`, payload )
            if (res.status === 200) {
                dispatch(GetCategory())
                dispatch({
                    type: categoryType.CREATE_CATEGORY_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: categoryType.CREATE_CATEGORY_FAILURE,
                    payload: err.response.data
                })
                return err.response.data
            }
        }
    } 
}

export const UpdateCategory = (id,payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: categoryType.UPDATE_CATEGORY_REQUEST })
            const res = await axios.patch(`/products/category/${id}`, payload )
            if (res.status === 200) {
                dispatch(GetCategory())
                dispatch({
                    type: categoryType.UPDATE_CATEGORY_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: categoryType.UPDATE_CATEGORY_FAILURE,
                    payload: err.response.data
                })
                return err.response.data
            }
        }
    } 
}

export const DeleteCategory = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: categoryType.DELETE_CATEGORY_REQUEST })
            const res = await axios.delete(`/products/category/${id}`)
            if (res.status === 200) {
                dispatch(GetCategory())
                dispatch({
                    type: categoryType.DELETE_CATEGORY_SUCCESS,
                })
            }
        } catch (err) {
            if (err.response?.status === 400) {
                dispatch({
                    type: categoryType.DELETE_CATEGORY_FAILURE,
                    payload: err.response.data
                })
                return err.response.data
            }
        }
    } 
}

export const ClearError = () => {
    return async dispatch => {
        dispatch({ type: categoryType.CATEGORY_CLEAR_ERROR })
    }
}