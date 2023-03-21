import {usersAPI} from '@/api/usersAPI'
import { DefaultError } from '@/utils/errors/defaultError'

export default {
    state: function () {
        return {
            isDoneUser: true,
            isDoneDeleteUser: true,

            user: null,
        }
    },

    mutations: {
        setIsDoneUser(state, isDone) {
            state.isDoneUser = isDone
        },
        setIsDoneDeleteUser(state, isDone) {
            state.isDoneDeleteUser = isDone
        },

        setUserData(state, payload) {
            state.user = payload
        }
    },

    actions: {
        async getUser({commit,dispatch}, userId) {
            try {
                commit('setIsDoneUser', false)

                const response = await usersAPI.getUser(userId)
                if(!response) throw new DefaultError('Помилка запиту користувача',400)
                commit('error/setGetUserError', null, {
                    root: true
                })

                await dispatch('rooms/getRooms',response.data.id,{root:true})

                commit('setUserData', response.data)
            } catch (error) {
                commit('error/setGetUserError', {
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                }, {
                    root: true
                })
            } finally {
                commit('setIsDoneUser', true)
            }
        },

        async deleteUser({commit,dispatch}, userId) {
            try {
                commit('setIsDoneDeleteUser', false)

                const response=await usersAPI.deleteUser(userId)
                if(!response) throw new DefaultError('Помилка видалення користувача',400)
                commit('error/setDeleteUserError', null, {
                    root: true
                })

                dispatch('auth/unlogin', null, {
                    root: true
                })
                return true
            } catch (error) {
                commit('error/setDeleteUserError', {
                    message:error.response?error.response.data.message:error.message,
                    code:error.response?error.response.status:error.status,
                }, {
                    root: true
                })
            } finally {
                commit('setIsDoneDeleteUser', true)
            }
        }
    },

    namespaced: true
}