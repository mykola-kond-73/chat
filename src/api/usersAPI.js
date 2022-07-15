import { instance } from "./API"

export const usersAPI={
    async getUser(userId){
        return await instance.get(`users/${userId}`) 
    }
}