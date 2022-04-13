import axios from "axios";
import { Config_ls } from "../utils/config";
import { authType } from '../action/auth/authType';
import store from '../store/store';
// const baseURL =
//   window.location.hostname === "localhost"
//     ? "http://192.168.31.184:3001"
//         : "https://dssbackend.herokuapp.com/api"
const baseURL = "http://localhost:3000"

const token = window.localStorage.getItem(Config_ls.userToken)



export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});
  

axiosInstance.interceptors.request.use((req) => { 
    const { auth } = store.getState();
    if (auth.token) { 
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})


axiosInstance.interceptors.response.use((res) => { 
    return res;
}, (error) => { 
        console.log(error.response);
        const { status } = error.response;
        if (status === 401) { 
            localStorage.removeItem(Config_ls.userToken);
            localStorage.removeItem(Config_ls.userData);
            store.dispatch({ type: authType.LOGOUT_SUCCESS });
        }
        return Promise.reject(error);
})



export default axiosInstance;