<template>
    <form @submit.prevent="sendMessage">
        <textarea rows="2" v-model="message"></textarea>
        <button type="submit">Надіслати</button>
    </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            message: ''
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.user.id,
            roomId:state=>state.messages.roomId,
        })
    },
    methods: {
        ...mapMutations({
            setMessage: 'messages/setMessage'
        }),

        sendMessage() {
            
            const date=new Date()
            const messageObj = {
                message: this.message,
                authorId:this.userId,
                isUpdate:false,
                roomId:this.roomId,
                createdDate:date.toISOString()
            }
            this.setMessage(messageObj)
            this.message=''
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

textarea{
    width: 100%;
    border: 2px solid rgb(23, 88, 115);
}

button{
    padding: 4px;
    margin: 0 15px;
    border: 2px solid rgb(23, 88, 115);
    background-color: rgba(135, 172, 163, 0.8);
}
</style>