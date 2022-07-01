import { createStore } from "vuex";
import authModule from "./modules/authModule";
import roomsModule from "./modules/roomsModule";
import userModule from "./modules/userModule";

const store=createStore({
    modules:{
        auth:authModule,
        rooms:roomsModule,
        user:userModule
    },

    devtools:true
})

export default store