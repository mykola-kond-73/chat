<template>
    <form @submit.prevent="sendMessage">
        <div v-if="error">
            <Error :error="error" />
        </div>
        <textarea rows="2" v-model="message"></textarea>
        <button type="submit">Надіслати</button>
    </form>
</template>

<script>
import { mapMutations, mapState,mapActions } from 'vuex';
import Error from '../errors/Error.vue';
import { authAPI } from '../../api/authAPI';

export default {
    components: { Error},
    data() {
        return {
            message: ''
        }
    },
    inject:['socket'],
    computed: {
        ...mapState({
            userId: state => state.user.user.id,
            roomId: state => state.messages.roomId,

            error:state=>state.error.createMessageError
        })
    },
    methods: {
        ...mapMutations({
            setMessage: 'messages/setMessage',
            setCreateMessageError:'error/setCreateMessageError',
        }),

        sendMessage() {
            const date = new Date()
            const messageObj = {
                message: this.message,
                authorId: this.userId,
                roomId: this.roomId,
                createdDate: date.toISOString(),

                token:`Bearer:${localStorage.getItem('token')}`
            }
            this.socket.emit('message', messageObj)
            this.message = ''
        }
    },
    created() {
        this.socket.on('message', (message) => {
            this.setMessage(message)
            this.setCreateMessageError(null)
        })
        this.socket.on('createMessageError',async (error,messageData)=>{
            if(error.status ==401){
                this.setCreateMessageError({
                message:'Ви не авторизовані',
                code:null,
            })

            const responce=await authAPI.refresh()
            localStorage.setItem('token',responce.data.accessToken)
            this.socket.emit('message',{...messageData,token:`Bearer:${responce.data.accessToken}`})

            }else{
                this.setCreateMessageError({
                message:error.message,
                code:error.status,
            })
            }
        })
    },
    unmounted(){
        this.socket.removeAllListeners('message')
        this.socket.removeAllListeners('createMessageError')
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

textarea {
    width: 100%;
    border: 2px solid rgb(23, 88, 115);
}

button {
    padding: 4px;
    margin: 0 15px;
    border: 2px solid rgb(23, 88, 115);
    background-color: rgba(135, 172, 163, 0.8);
}
</style>