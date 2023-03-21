import { instance } from './API'

export const authAPI={
    async login({login,password}){
        const response=await instance.post('auth/login',{email:login,password})
        return response
    },

    async unlogin(){
        return await instance.post('auth/unlogin')
    },

    async register(payload){
        return await instance.post('auth/register',payload)
    },

    async refresh(){
        return await instance.get('auth/refresh')
    }
}