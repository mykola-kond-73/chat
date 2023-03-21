import {createApp} from 'vue'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import {io} from "socket.io-client"
import { authAPI } from './api/authAPI'

const app = createApp(App)

let socket = io('http://localhost:5000', {
    withCredentials: true,
    allowEIO3: false
})
socket.on('connect', () => console.log('socket connect'))
socket.on('disconnect',()=> socket=io('http://localhost:5000', {
    withCredentials: true,
    allowEIO3: false
}))

// app.config.errorHandler=function(err,component,str){
//     console.log(err)
//     console.log()
//     console.log(component)
//     console.log()
//     console.log(str)
// }

// app.config.warnHandler=function(warn,component,str){
//     console.log(warn)
//     console.log()
//     console.log(component)
//     console.log()
//     console.log(str)
// }

// const socket=new VueSocketIO({
//     debug: true,
//     connection: SocketIO('http://localhost:5000/',{ withCredentials: true, allowEIO3: false }), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })

app
    .use(store)
    .use(router)
    // .use(socket)
    .provide('socket', socket)
    .mount('#app')