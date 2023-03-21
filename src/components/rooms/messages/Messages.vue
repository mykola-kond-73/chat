<template>
    <div class="messages">
        <div v-if="isMessages">Load...</div>
        <div>
            <div class="msgHeader">
              
                <div v-if="roomId">
                    <div v-if="isDoneDeleteRoom" @click="deleteRoom({ roomId, userId })">
                        Видалити чат
                    </div>
                    <Load v-else/>
                </div>
            </div>
            <div class="messagesCont" @scroll="scrollHadler" >
                <div v-if="!isDoneMessages">Load...</div>
                <div v-else v-for="message in messages">
                    <Message :message="message" :userId="userId" />
                </div>
            </div>
            <div class="msgForm" v-if="roomId">
                <UpdateMessageForm v-if="isUpdate" />
                <CreateMEssageForm v-else :socket="socket" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Message from './Message.vue';
import CreateMEssageForm from '@/components/forms/CreateMEssageForm.vue';
import UpdateMessageForm from '@/components/forms/UpdateMessageForm.vue';
import Load from '@/components/Load.vue';

export default {
    components: { Message, CreateMEssageForm, UpdateMessageForm, Load },
    inject:['socket'],
    data() {
        return {
            isMessages: Boolean(this.messages)
        }
    },
    computed: {
        ...mapState({
            isDoneMessages: state => state.messages.isDoneMessages,
            isDoneDeleteRoom: state => state.rooms.isDoneDeleteRoom,

            messages: state => state.messages.messages,
            roomId: state => state.messages.roomId,
            userId: state => state.user.user.id,

            isUpdate: state => state.messages.isUpdate,

            page: state => state.messages.page,
            count: state => state.messages.count,
        })
    },
    methods: {
        ...mapMutations({
            setPage: 'messages/setPage',

            deleteMessage:'messages/deleteMessage',
            updateMessage:'messages/updateMessage',
        }),
        ...mapActions({
            deleteRoom: 'rooms/deleteRoom',
            getMessages: 'messages/getMessages',
        }),

        scrollHadler(e) {

            // if (e.target.scrollTop <= 20) {
            //     this.setPage(this.page + 1)
            //     this.getMessages({ roomId: this.roomId, page: this.page, count: this.count })
            // }
        }
    },

    created() {
        this.socket.on('deleteFromServer', (message) => {
            this.deleteMessage(message)
        }),

        this.socket.on('updateFromServer', async (message) => {
            this.updateMessage(message)
        })
    },
    unmounted(){
        this.socket.removeAllListeners('deleteFromServer')
        this.socket.removeAllListeners('updateFromServer')

    }

}
</script>

<style scoped>
.messages {
    grid-area: m;
    min-width: 100%;
    padding: 0 25px 0 15px;
}

.msgHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    background-color: rgba(23, 88, 115, 0.7);
    height: 30px;
}

.msgHeader>div {
    padding: 5px;
}

.msgForm {
    margin-top: 20px;
}

.messagesCont {
    overflow-y: scroll;
    overflow-x: hidden;

    height: 70vh;
    border-bottom: 1px solid rgba(23, 88, 115, 0.7);
}

::-webkit-scrollbar {
    display: none;
}
</style>