import { roomsAPI } from '@/api/roomsAPI'

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
                commit('error/setGetRoomsError',null,{root:true})

                commit('setRooms',response.data)

                return true
            }catch(error){
                commit('error/setGetRoomsError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneRooms',true)
            }
        },

        async createRoom({commit,dispatch},{userId_1,userId_2}){
            try{
                commit('isDoneCreateRoom',false)

                await roomsAPI.createRoom(userId_1,userId_2)
                commit('error/setCreateRoomError',null,{root:true})

                await dispatch('getRooms',userId_1)

                return true
            }catch(error){
                commit('error/setCreateRoomError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneCreateRoom',true)
            }
        },

        async deleteRoom({commit},{roomId,userId}){
            try{
                commit('isDoneDeleteRoom',false)

                await roomsAPI.deleteRoom(roomId,userId)
                commit('error/setDeleteRoomError',null,{root:true})

                commit('messages/setMessages',null,{root:true})
                commit('deleteRoom',roomId)

                return true
            }catch(error){
                commit('error/setDeleteRoomError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('isDoneDeleteRoom',true)
            }
        }
    },

    namespaced:true
}