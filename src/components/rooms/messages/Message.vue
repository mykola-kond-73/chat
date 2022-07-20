<template>
    <div class="container" @mouseleave="isShowActions = false">
        <div :key="message.id" class="messageContainer" :class="{ myMsg: isMyMsg, fremdMsg: !isMyMsg }" @mouseenter="isShowActions = true">
            <div v-if="message.isUpdate" class="updated"  @click="getDate(message.createdDate)">Оновлено</div>
            <p class="message">
                {{ message.message }}
            </p>
            <div class="date">{{message.createdDate}}</div>
        </div>
        <div v-show="isShowActions" class="actions" :class="{ myMsgAction: isMyMsg, fremdMsgAction: !isMyMsg }">
            <div class="delete" @click="deleteMessage({ messageId: message.id, authorId: message.authorId })">x</div>
            <div v-if="userId == message.authorId" class="edit" @click="updateMessageHandler(message.message, message.id)">e</div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    props: ['message'],
    data() {
        return {
            isShowActions: false,
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.user.id,
            isDoneUpdateMessage: state => state.messages.isDoneUpdateMessage,
            isDoneDeleteMessage: state => state.messages.isDoneDeleteMessage,
        }),

        isMyMsg() {
            return this.message && this.message.authorId == this.userId
        }
    },
    methods: {
        ...mapActions({
            deleteMessage: 'messages/deleteMessage',
        }),
        ...mapMutations({
            setIsUpdate: 'messages/setIsUpdate',
            setUpdateMessage: 'messages/setUpdateMessage',
            setUpdateMessageId: 'messages/setUpdateMessageId'
        }),

        updateMessageHandler(message, messageId) {
            this.setIsUpdate(true)
            this.setUpdateMessageId(messageId)
            this.setUpdateMessage(message)
        },

        getDate(date){
            const newDate=new Date(date)
            console.log(newDate.toLocaleDateString())
            console.log(newDate.toLocaleTimeString())
        }
    }

}
</script>

<style scoped>
.updated,.date {
    font-size: 0.7em;
    position: relative;
    left:10px
}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.actions {
    font-size: 0.75em;
}

.messageContainer {
    margin: 10px 15px 10px 0;
    font-size: 0.85em;
    max-width: 60%;
}
.message {
    padding: 3px 10px;
    word-wrap: break-word
}
.myMsg {
    margin-left: auto;
}
.fremdMsg {
    margin-left: 15px;
}

.myMsg>.message {
    border: 2px solid rgba(23, 88, 115, 0.7);
    border-radius: 10px 7px 7px 10px;
}

.fremdMsg>.message {
    border: 2px solid rgba(43, 124, 133, 0.7);
    border-radius: 7px 10px 10px 7px;
}

.delete {
    color: red;
}
.edit {
    color: yellowgreen
}
</style>