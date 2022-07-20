import { createStore } from "vuex";
import authModule from "./modules/authModule";
import errorsModule from "./modules/errorsModule";
import messagesModule from "./modules/messagesModule";
import roomsModule from "./modules/roomsModule";
import userModule from "./modules/userModule";

const store=createStore({
    modules:{
        auth:authModule,
        rooms:roomsModule,
        user:userModule,
        messages:messagesModule,

        error:errorsModule
    },

    devtools:true
})

export default store