import { messageAPI } from "@/api/messagesAPI"
import { DefaultError } from "@/utils/errors/defaultError"

export default {
    state: function () {
        return {
            isDoneMessages:true,
            isDoneUpdateMessage:true,
            isDoneDeleteMessage:true,

            isUpdate:false,
            updateMessageId:null,
            updateMessage:'',

            messages: [],
            roomId:null,

            page:1,
            count:50
        }
    },

    mutations: {
        isDoneMessages(state,payload){
            state.isDoneMessages=payload
        },
        isDoneUpdateMessage(state,payload){
            state.isDoneUpdateMessage=payload
        },
        isDoneDeleteMessage(state,payload){
            state.isDoneDeleteMessage=payload
        },

        setIsUpdate(state,payload){
            state.isUpdate=payload
        },
        setUpdateMessageId(state,payload){
            state.updateMessageId=payload
        },
        setUpdateMessage(state,payload){
            state.updateMessage=payload
        },

        setMessages(state, payload) {
            const messages = payload.map(elem=>{
                const date=new Date(elem.createdDate)
                elem.createdDate=`${date.toLocaleDateString()}:${date.toLocaleTimeString()}`
                return elem
            })
            state.messages=[...messages,...state.messages]
        },
        setMessage(state,payload){
            if(state.messages) state.messages=[...state.messages,payload]
        },

        updateMessage(state,payload){
            const date=new Date(payload.createdDate)
            const newPayload=payload
            newPayload.createdDate=`${date.toLocaleDateString()}:${date.toLocaleTimeString()}`
            
            state.messages=state.messages.map(elem=>{
                if(elem.id==payload.id) return payload
                else return elem
            })
        },

        clearMessages(state){
            state.messages=[]
        },

        deleteMessage(state,messageId){
            state.messages=state.messages.filter(elem=>elem.id!=messageId)
        },

        setRoomId(state,payload){
            state.roomId=payload
        },

        setPage(state,page){
            state.page=page
        },
        setCount(state,count){
            state.count=count
        }
    },

    actions: {
        async getMessages({commit},{roomId,page,count}){
            try{
                commit('isDoneMessages',false)
                commit('clearMessages')
                const response=await messageAPI.getMessages(roomId,page,count)
                if(!response) throw new DefaultError('Помилка запиту повідомлень',400)
                commit('error/setGetMessagesError',null,{root:true})

                commit('setMessages',response.data)

                return true
            }catch(error){
                console.log(error)
                commit('error/setGetMessagesError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneMessages',true)
            }
        },

        async updateMessage({commit},{messageId,newMessage,socket,roomId}){
            try{
                commit('isDoneUpdateMessage',false)

                const response=await messageAPI.updateMessage(messageId,{newMessage})
                if(!response) throw new DefaultError('Помилка оновлення повідомлення',400)

                socket.emit('update',{message:response.data,roomId})
                commit('error/setUpdateMessageError',null,{root:true})

                // commit('updateMessage',response.data)

                return true
            }catch(error){
                commit('error/setUpdateMessageError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneUpdateMessage',true)

                commit('setIsUpdate',false)
                commit('setUpdateMessageId',null)
                commit('setUpdateMessage','')
            }
        },

        async deleteMessage({commit},{messageId,authorId,socket,roomId}){
            try{
                commit('isDoneDeleteMessage',true)

                const response=await messageAPI.deleteMessage(messageId,authorId)
                if(!response) throw new DefaultError('Помилка видалення повідомлення',400)
                socket.emit('delete',{messageId,roomId})
                
                commit('error/setDeleteMessageError',null,{root:true})

                // commit('deleteMessage',messageId)

                return true
            }catch(error){
                commit('error/setDeleteMessageError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneDeleteMessage',false)
            }
        }
    },

    namespaced: true
}