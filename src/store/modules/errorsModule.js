export default {
    state:function(){
        return{
            loginError:null,
            unloginError:null,
            registerError:null,
            getUserError:null
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
    },

    namespaced: true
}
