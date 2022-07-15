import { usersAPI } from '@/api/usersAPI'

export default {
    state: function(){
        return{
            user:null
        }
    },

    mutations:{
        setUserData(state,payload){
            state.user=payload
        }
    },

    actions:{
        async getUser({commit},userId){
            const response=await usersAPI.getUser(userId)
            commit('setUserData',response.data)
        }
    },

    namespaced:true
}