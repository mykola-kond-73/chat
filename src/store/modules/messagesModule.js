import { messageAPI } from "@/api/messagesAPI"

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
            count:3
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

                const response=await messageAPI.getMessages(roomId,page,count)
                commit('error/setGetMessagesError',null,{root:true})

                commit('setMessages',response.data)

                return true
            }catch(error){
                console.log(error)
                commit('error/setGetMessagesError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneMessages',true)
            }
        },

        async updateMessage({commit},{messageId,newMessage}){
            try{
                commit('isDoneUpdateMessage',true)

                const response=await messageAPI.updateMessage(messageId,{newMessage})
                commit('error/setUpdateMessageError',null,{root:true})

                commit('updateMessage',response.data)

                return true
            }catch(error){
                commit('error/setUpdateMessageError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneUpdateMessage',false)

                commit('setIsUpdate',false)
                commit('setUpdateMessageId',null)
                commit('setUpdateMessage','')
            }
        },

        async deleteMessage({commit},{messageId,authorId}){
            try{
                commit('isDoneDeleteMessage',true)

                await messageAPI.deleteMessage(messageId,authorId)
                commit('error/setDeleteMessageError',null,{root:true})

                commit('deleteMessage',messageId)

                return true
            }catch(error){
                commit('error/setDeleteMessageError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneDeleteMessage',false)
            }
        }
    },

    namespaced: true
}