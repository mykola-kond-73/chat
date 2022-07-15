import {
    authAPI
} from '@/api/authAPI'

export default {
    state: function () {
        return {
            isAuth: false,
            isShowDialogLogin: false,
            isSchowDialogRegister: false,

            authObj: {
                login: '',
                password: ''
            },

            registerObj: {
                email: '',
                name: '',
                password: ''
            }
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
                const response=await authAPI.login(payload)
                commit('setIsAuth', true)
        
                commit('setIsShowDialogLogin', false)
                commit('setAuthLogin', '')
                commit('setAuthPassword', '')

                await dispatch('user/getUser',response.data.userId,{root:true})

                return true
            } catch (error) {
                console.log(error)
            }
        },

        async unlogin({commit}) {
            try {
                await authAPI.unlogin()
                commit('setIsAuth', false)
                commit('user/setUserData',null,{root:true})
                return true
            } catch (error) {
                console.log(error)
            }
        },

        async register({state,commit,dispatch}) {
            try {
                const response =await authAPI.register({
                    email: state.registerObj.email,
                    name: state.registerObj.name,
                    password: state.registerObj.password
                })

                dispatch('login',{
                    login: state.registerObj.email,
                    password: state.registerObj.password
                })

                commit('setIsShowDialogRegister', false)
                commit('setRegisterEmail','')
                commit('setRegisterName','')
                commit('setRegisterPassword','')
                return true
            } catch (error) {
                console.log(error)
            }
        },

        test() {
            console.log('test')
            authAPI.test()

        }
    },

    namespaced: true
}