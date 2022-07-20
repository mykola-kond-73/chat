import {authAPI} from '@/api/authAPI'

export default {
    state: function () {
        return {
            isAuth: false,
            isShowDialogLogin: false,
            isSchowDialogRegister: false,

            isDoneLogin:true,
            isDoneUnlogin:true,
            isDoneRegister:true,

            userId:null,

            authObj: {
                login: '',
                password: ''
            },

            registerObj: {
                email: '',
                name: '',
                password: ''
            },


        }
    },

    getters: {

    },

    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth
        },
        setIsShowDialogLogin(state, isShow) {
            state.isShowDialogLogin = isShow
        },
        setIsShowDialogRegister(state, isShow) {
            state.isSchowDialogRegister = isShow
        },

        setIsDoneLogin(state,isDone){
            state.isDoneLogin=isDone
        },
        setIsDoneUnlogin(state,isDone){
            state.isDoneUnlogin=isDone
        },
        setIsDoneRegister(state,isDone){
            state.isDoneRegister=isDone
        },

        setUserId(state,userId){
            state.userId=userId
        },

        setAuthLogin(state, login) {
            state.authObj.login = login
        },
        setAuthPassword(state, password) {
            state.authObj.password = password
        },

        setRegisterEmail(state, email) {
            state.registerObj.email = email
        },
        setRegisterName(state, name) {
            state.registerObj.name = name
        },
        setRegisterPassword(state, password) {
            state.registerObj.password = password
        }
    },

    actions: {
        async login({commit,dispatch,}, payload) {
            try {
                commit('setIsDoneLogin',false)

                const response=await authAPI.login(payload)
                commit('error/setLoginError',null,{root:true})
                commit('setUserId',response.data.userId)
                
                commit('setIsAuth', true)
                commit('setIsShowDialogLogin', false)
                commit('setAuthLogin', '')

                await dispatch('user/getUser',response.data.userId,{root:true})

                return true
            } catch (error) {
                commit('error/setLoginError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('setIsDoneLogin',true)
                commit('setAuthPassword', '')
                commit('setUserId',null)
            }
        },

        async unlogin({commit}) {
            try {
                commit('setIsDoneUnlogin',false)
                await authAPI.unlogin()
                commit('error/setUnloginError',null,{root:true})

                commit('setIsAuth', false)
                commit('user/setUserData',null,{root:true})

                commit('messages/clearMessages',null,{root:true})
                commit('messages/setRoomId',null,{root:true})

                return true
            } catch (error) {
                commit('error/setUnloginError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status
                },{root:true})
            }finally{
                commit('setIsDoneUnlogin',true)
            }
        },

        async register({state,commit,dispatch}) {
            try {
                commit('setIsDoneRegister', false)

                await authAPI.register({
                    email: state.registerObj.email,
                    name: state.registerObj.name,
                    password: state.registerObj.password
                })
                commit('error/setRegisterError',null,{root:true})

                await dispatch('unlogin')

                await dispatch('login',{
                    login: state.registerObj.email,
                    password: state.registerObj.password
                })

                commit('setIsShowDialogRegister', false)
                commit('setRegisterEmail','')
                commit('setRegisterName','')
                return true
            } catch (error) {
                commit('error/setRegisterError',{
                    message:error.response.data?error.response.data.message:error.message,
                    code:error.response.status,
                },{root:true})
            }finally{
                commit('setIsDoneRegister',true)
                commit('setRegisterPassword','')
            }
        },

        test() {
            console.log('test')
            authAPI.test()

        }
    },

    namespaced: true
}