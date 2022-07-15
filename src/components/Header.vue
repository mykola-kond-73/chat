<template>
    <header class="header">
        <Navbar/>
        <div  class="authMenu">
            <div v-if="!isAuth" @click="setIsShowDialogLogin(true)"  class="router">
                Login
            </div>
            <div v-else @click="unloginHandler()" class="router">
                Unlogin
            </div>
            <div @click="()=>{setIsShowDialogRegister(true)}"  class="router">
                Register
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Navbar from './Navbar.vue'

export default {
    components: {
    Navbar
},
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth
        })
    },
    methods: {
        ...mapMutations({
            setIsShowDialogLogin: 'auth/setIsShowDialogLogin',
            setIsShowDialogRegister: 'auth/setIsShowDialogRegister',
        }),

        ...mapActions({
            unlogin:'auth/unlogin'
        }),

        unloginHandler(){
            this.unlogin()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background-color: teal;
    /* height: 25px; */
}

.authMenu{
    display: flex;
    flex-direction: row;
}
</style>