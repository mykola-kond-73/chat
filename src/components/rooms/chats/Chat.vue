<template>
    <div :key="room.id" class="room" @click="openRoom(room.id)" :class="{active:room.id===roomId}">
        <div v-if="room.user_1.id==userId">
            {{room.user_2.name}}
        </div>
        <div v-else>
            {{room.user_1.name}}
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    inject: ['socket'],
    props: {
        room: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState({
            page: state => state.messages.page,
            count: state => state.messages.count,

            roomId: state => state.messages.roomId,
            userId: (state) => state.user.user.id,
        })
    },
    methods: {
        ...mapMutations({
            setMessages: 'messages/setMessages',
            setRoomId: 'messages/setRoomId',
        }),
        ...mapActions({
            getMessages: 'messages/getMessages'
        }),

        openRoom(roomId) {
            this.getMessages({ roomId: roomId, page: this.page, count: this.count })
            this.setRoomId(roomId)
            
            this.socket.emit('conn', {roomId: this.roomId})
        }
    }
}
</script>

<style scoped>
.room {
    padding: 20px 0px;
}
.active{
    color:black
}
</style>