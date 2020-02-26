import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Schedule from '../components/schedule/Schedule'
import TeacherPage from '../components/teacher/TeacherPage'
import ResourcesAdmin from '../components/admin/ResourcesAdmin'
import GeneralAdmin from '../components/admin/generalAdmin/GeneralAdmin'

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
    },
    {
        name: 'teacher',
        path: '/teacher',
        component: TeacherPage,
    },
    {
        name: 'resourcesAdmin',
        path: '/resourcesAdmin',
        component: ResourcesAdmin,
    },
    {
        name: 'generalAdmin',
        path: '/generalAdmin',
        component: GeneralAdmin,
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
})

