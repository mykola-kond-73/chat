<template>
    <div :key="room.id" class="room" @click="openRoom(room.id)">
        {{ room.id }}
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    props:{
        room:{
            type:Object,
            required:true
        }
    },
    computed: {
        ...mapState({
            page:state=>state.messages.page,
            count:state=>state.messages.count,
        })
    },
    methods:{
        ...mapMutations({
            setMessages: 'messages/setMessages',
            setRoomId: 'messages/setRoomId',
        }),
        ...mapActions({
            getMessages:'messages/getMessages'
        }),

        openRoom(roomId) {
            this.getMessages({roomId:roomId,page:this.page,count:this.count})
            this.setRoomId(roomId)
        }
    }
}
</script>

<style scoped>
.room {
    padding: 20px 0px;
}
</style>