import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';



const baseURL = 'http://localhost:3000'


const useAxios = () => {
    const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers:{authorization: `Bearer ${authTokens}`}
    });


    // axiosInstance.interceptors.request.use(async req => {
    //      //we can check and refresh token here
    //     return req
    // })
    
    return axiosInstance
}

export default useAxios;