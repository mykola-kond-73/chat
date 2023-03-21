<template>
    <Load v-if="!isDoneUser" data-testid="rooms-page"/>
    <div v-else class="root">
        <Chats/>
        <Messages/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Chats from '@/components/rooms/chats/Chats.vue';
import Messages from '@/components/rooms/messages/Messages.vue';
import Load from '@/components/Load.vue';

export default {
    components: { Chats, Messages, Load },
    // inject: ['socket'],
    data(){
        return{
            room:{}
        }
    },  
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            isDoneUser: state => state.user.isDoneUser,
        })
    },
    mounted() {
        if (!this.isAuth) this.$router.push("/")        
    },
    watch:{
        isAuth(newValue){
            if (!newValue) this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.root {
    display: grid;
    margin-top: 15px;
    height: 100vh;

    grid-template-areas:
        "r m";

    grid-template-columns: 300px 1fr;
}
</style>