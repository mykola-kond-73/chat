<template>
    <header class="header">
        <Navbar />
        <div v-if="isAuth && user" @mouseleave="isShowDelUser = false">
            <div @mouseenter="isShowDelUser = true" class="router">
                {{ user.name }}
                <Load v-if="!isDoneUser" />
            </div>

            <div v-show="isShowDelUser" class="delUser" @click="deleteUser(user.id)">
                Delete user
            </div>
        </div>
        <div class="authMenu">
            <div v-if="!isAuth" @click="setIsShowDialogLogin(true)" class="router">
                Login
            </div>
            <div v-else @click="unloginHandler()" class="router">

                <Load v-if="!isDoneUnlogin" />
                <div v-else>
                    Unlogin
                </div>
            </div>
            <div @click="() => { setIsShowDialogRegister(true) }" class="router">
                Register
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Navbar from './Navbar.vue'
import Load from './Load.vue'

export default {
    components: {
        Navbar,
        Load
    },
    data() {
        return {
            isShowDelUser: false
        }
    },

    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            isDoneUnlogin: state => state.auth.isDoneUnlogin,
            user: state => state.user.user,
            isDoneUser: state => state.user.isDoneDeleteUser
        })
    },
    methods: {
        ...mapMutations({
            setIsShowDialogLogin: 'auth/setIsShowDialogLogin',
            setIsShowDialogRegister: 'auth/setIsShowDialogRegister',
        }),

        ...mapActions({
            unlogin: 'auth/unlogin',
            deleteUser: 'user/deleteUser'
        }),

        unloginHandler() {
            this.unlogin()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.delUser {
    position: fixed;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white
}

.header {
    justify-content: space-between;
    background-color: teal;
}

.authMenu,
.header {
    display: flex;
    flex-direction: row;
}
</style>