import { instance } from './API'

export const authAPI={
    async login({login,password}){
        const response=await instance.post('auth/login',{},{headers:{
            'Authorization':`${login}:${password}`
        }})
        return response
    },

    async unlogin(){
        return await instance.post('auth/unlogin')
    },

    async register(payload){
        return await instance.post('auth/register',payload)
    },

    async test(){
        return await instance.get('auth/test')
    }
}