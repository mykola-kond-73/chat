import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

const app=createApp(App)

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

app
    .use(store)
    .use(router)
    .mount('#app')