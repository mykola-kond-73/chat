import { roomsAPI } from '@/api/roomsAPI'
import { DefaultError } from '@/utils/errors/defaultError'

export default {
    state: function(){
        return{
            isDoneRooms:true,
            isDoneCreateRoom:true,
            isDoneDeleteRoom:true,

            rooms:null
        }
    },

    mutations:{
        isDoneRooms(state,payload){
            state.isDoneRooms=payload
        },
        isDoneCreateRoom(state,payload){
            state.isDoneCreateRoom=payload
        },
        isDoneDeleteRoom(state,payload){
            state.isDoneDeleteRoom=payload
        },

        setRooms(state,payload){
            state.rooms=payload
        },
        deleteRoom(state,roomId){
            state.rooms=state.rooms.filter(elem=>elem.id!=roomId)
        }

    },

    actions:{
        async getRooms({commit},userId){
            try{
                commit('isDoneRooms',false)

                const response=await roomsAPI.getRooms(userId)
                if(!response) throw new DefaultError('Помилка запиту кімнати',400)
                commit('error/setGetRoomsError',null,{root:true})

                commit('setRooms',response.data)

                return true
            }catch(error){
                commit('error/setGetRoomsError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneRooms',true)
            }
        },

        async createRoom({commit,dispatch},{userId_1,userId_2}){
            try{
                commit('isDoneCreateRoom',false)

                const response=await roomsAPI.createRoom(userId_1,userId_2)
                if(!response) throw new DefaultError('Помилка створення кімнати',400)

                commit('error/setCreateRoomError',null,{root:true})

                await dispatch('getRooms',userId_1)

                return true
            }catch(error){
                commit('error/setCreateRoomError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneCreateRoom',true)
            }
        },

        async deleteRoom({commit},{roomId,userId}){
            try{
                commit('isDoneDeleteRoom',false)

                const response=await roomsAPI.deleteRoom(roomId,userId)
                if(!response) throw new DefaultError('Помилка видалення кімнати',400)
                commit('error/setDeleteRoomError',null,{root:true})

                commit('messages/clearMessages',null,{root:true})

                commit('deleteRoom',roomId)

                return true
            }catch(error){
                commit('error/setDeleteRoomError',{
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                },{root:true})
            }finally{
                commit('isDoneDeleteRoom',true)
            }
        }
    },

    namespaced:true
}