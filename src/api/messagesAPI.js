import { instance } from "./API"

export const messageAPI={
    getMessages(roomId,page,count){
        return instance.get(`messages/${roomId}?page=${page}&count=${count}`)
    },
    updateMessage(messageId,payload){
        return instance.put(`messages/${messageId}`,payload)
    },
    deleteMessage(messageId,authorId){
        return instance.delete(`messages/${messageId}?authorId=${authorId}`)
    }
}