import { instance } from "./API"

export const usersAPI={
    getUser(userId){
        return  instance.get(`users/${userId}`) 
    },
    deleteUser(userId){
        return instance.delete(`users/${userId}`)
    }
}