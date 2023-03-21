export default {
    state:function(){
        return{
            loginError:null,
            unloginError:null,
            registerError:null,
            refreshError:null,

            getUserError:null,
            deleteUserError:null,

            createRoomError:null,
            getRoomsError:null,
            deleteRoomError:null,

            createMessageError:null,
            getMessagesError:null,
            updateMessageError:null,
            deleteMessageError:null,
        }
    },

    mutations:{
        setLoginError(state,payload){
            state.loginError=payload
        },
        setUnloginError(state,payload){
            state.unloginError=payload
        },
        setRegisterError(state,payload){
            state.registerError=payload
        },
        setRefreshError(state,payload){
            state.refreshError=payload
        },

        setGetUserError(state,payload){
            state.getUserError=payload
        },
        setDeleteUserError(state,payload){
            state.deleteUserError=payload
        },

        setCreateRoomError(state,payload){
            state.createRoomError=payload
        },
        setGetRoomsError(state,payload){
            state.getRoomsError=payload
        },
        setDeleteRoomError(state,payload){
            state.deleteRoomError=payload
        },

        setCreateMessageError(state,payload){
            state.createMessageError=payload
        },
        setGetMessagesError(state,payload){
            state.getMessagesError=payload
        },
        setUpdateMessageError(state,payload){
            state.updateMessageError=payload
        },
        setDeleteMessageError(state,payload){
            state.deleteMessageError=payload
        }
    },

    namespaced: true
}
