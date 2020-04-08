import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Schedule from '../views/Schedule'
import TeacherPage from '../views/TeacherPage'
import ResourcesAdmin from '../views/ResourcesAdmin'
import GeneralAdmin from '../views/GeneralAdmin'
import { userKey } from "@/global";

Vue.use(VueRouter)

const routes = [{
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
        meta: { resourcesAdmin: true },
    },
    {
        name: 'generalAdmin',
        path: '/generalAdmin',
        component: GeneralAdmin,
        meta: { generalAdmin: true },
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.ResourcesAdmin)) {
        const user = JSON.parse(json)
        user && user.ResourcesAdmin ? next() : next({ path: '/' })
    }
    if (to.matched.some(record => record.meta.GeneralAdmin)) {
        const user = JSON.parse(json)
        user && user.GeneralAdmin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router