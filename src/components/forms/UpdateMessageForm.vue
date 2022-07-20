<template>
    <form @submit.prevent="updateMessageAction({messageId:updateMessageId,newMessage:updateMessage})">
        <textarea rows="2" :value="updateMessage" @input="(e)=>setUpdateMessage(e.target.value)"></textarea>
        <button type="submit" v-if="isDoneUpdateMessage">Оновити</button>
        <Load v-else/>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Load from '../Load.vue';

export default {
    data() {
        return {
            message: ""
        };
    },
    computed: {
        ...mapState({
            isDoneUpdateMessage: state => state.messages.isDoneUpdateMessage,
            updateMessageId: state => state.messages.updateMessageId,
            updateMessage: state => state.messages.updateMessage
        })
    },
    methods: {
        ...mapMutations({
            setUpdateMessage: "messages/setUpdateMessage"
        }),
        ...mapActions({
            updateMessageAction: "messages/updateMessage"
        })
    },
    components: { Load }
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