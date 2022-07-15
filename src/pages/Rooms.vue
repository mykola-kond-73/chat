<template>
    <div>
        rooms
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

    computed:{
        ...mapState({
            isAuth:state=>state.auth.isAuth
        })
    },
    methods:{
        isAuthHandler(){
            console.log('load rooms')
            if(!this.isAuth) this.$router.push('/')
        }
    },

    mounted(){
        if(!this.isAuth) this.$router.push('/')
    }

}
</script>

<style scoped>
</style>