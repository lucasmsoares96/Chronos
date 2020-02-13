import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Schedule from '../components/schedule/Schedule'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'schedule',
        path: '/schedule',
        component: Schedule,
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
})

