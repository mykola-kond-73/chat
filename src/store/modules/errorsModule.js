export default {
    state:function(){
        return{
            loginError:null,
            unloginError:null,
            registerError:null,

            getUserError:null,
            deleteUserError:null,

            createRoomError:null,
            getRoomsError:null,
            deleteRoomError:null,

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
