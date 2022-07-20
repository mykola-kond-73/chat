<template>
    <p>Створити новий чат</p>

    <form @submit.prevent="createRoomHandlet" class="addRoomForm">
        <input type="text" v-model="newRoomUserId_2">
        <div v-if="!isDoneCreateRoom">Load...</div>
        <button v-else type="submit">Створити</button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            newRoomUserId_2: "",
        };
    },
    computed: {
        ...mapState({
            isDoneCreateRoom: state => state.rooms.isDoneCreateRoom,
            userId: state => state.user.user.id,

        })
    },
    methods: {
        ...mapActions({
            createRoom: "rooms/createRoom",
        }),

        createRoomHandlet() {
            this.createRoom({
                userId_1: this.userId,
                userId_2: this.newRoomUserId_2
            });
            this.newRoomUserId_2 = "";
        },
    }
}
</script>

<style scoped>
.addRoomForm {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    padding-top: 10px;
}

p {
    text-align: center;
}
</style>