<template>
    <div class="rooms">
        <div v-if="!isDoneRooms">
            Load...
        </div>

        <div class="addRoom">
            <CreateRoomForm />
        </div>

        <div v-for="room in rooms">
            <Chat :room="room"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CreateRoomForm from '@/components/forms/CreateRoomForm.vue';
import Chat from './Chat.vue';

export default {
    components: {
        CreateRoomForm,
        Chat
    },
    computed: {
        ...mapState({
            isDoneRooms: state => state.rooms.isDoneRooms,
            rooms: state => state.rooms.rooms,
        })
    },
}
</script>

<style scoped>
.rooms {
    grid-area:r;

    padding: 0px 10px 0px 20px;
    border-right: 3px solid #0C1446;
    background-color: rgba(23, 88, 115, 0.7);

    color: white;

    overflow-y: scroll;
    overflow-x: hidden;
}

.addRoom {
    padding: 15px 0;
}
::-webkit-scrollbar {
    display: none;
}
</style>