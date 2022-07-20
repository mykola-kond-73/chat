import { instance } from "./API"

export const roomsAPI={
    createRoom(userId_1,userId_2){
        return instance.post('rooms',{clientId_1: userId_1, clientId_2:userId_2})
    },
    getRooms(userId){
        return instance.get(`rooms/${userId}`)
    },
    deleteRoom(roomId,userId){
        return instance.delete(`rooms/${roomId}?userId=${userId}`)
    }
} 