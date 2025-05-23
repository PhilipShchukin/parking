import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import axios, {type CreateAxiosDefaults} from 'axios'
import { errorCatch } from './error'
import { authSevice } from '@/services/auth.sevice'


const options:CreateAxiosDefaults = {
    baseURL: 'http://localhost:4200/api',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config =>{
    const accessToken  = getAccessToken()

    if(config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if(
            (error?.response?.status == 401 ||
                errorCatch(error) == 'jwt expired' ||
                errorCatch(error) == 'jwt must be provider') && error.config && !error.config._isRetry
            ){
                originalRequest._isRetry = true
                try{
                    await authSevice.getNewTokens()
                    return axiosWithAuth.request(originalRequest)
                }catch(error){
                    if(errorCatch(error) == 'jwt expired') removeFromStorage()
                }
            }
        throw error
    }
)

export {axiosClassic,axiosWithAuth}