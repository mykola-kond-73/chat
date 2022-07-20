import {usersAPI} from '@/api/usersAPI'

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
                commit('error/setGetUserError', null, {
                    root: true
                })

                await dispatch('rooms/getRooms',response.data.id,{root:true})

                commit('setUserData', response.data)
            } catch (error) {
                commit('error/setGetUserError', {
                    message: error.response.data ? error.response.data.message : error.message,
                    code: error.response.status
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
                await usersAPI.deleteUser(userId)
                commit('error/setDeleteUserError', null, {
                    root: true
                })

                dispatch('auth/unlogin', null, {
                    root: true
                })
                return true
            } catch (error) {
                commit('error/setDeleteUserError', {
                    message: error.response.data ? error.response.data.message : error.message,
                    code: error.response.status
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