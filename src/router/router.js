import Home from '@/pages/Home.vue'
import Rooms from '@/pages/Rooms.vue'
import { createRouter, createWebHashHistory} from 'vue-router'

const routes=[
    {
        path:'/',
        component:Home
    },
    {
        path:'/rooms',
        component:Rooms
    }
]

const router= createRouter({
    routes,
    history:createWebHashHistory(),
    sensitive:true
})

export default router