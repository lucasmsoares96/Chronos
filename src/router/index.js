import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Schedule from '../views/Schedule'
import TeacherPage from '../views/TeacherPage'
import ResourcesAdmin from '../views/ResourcesAdmin'
import GeneralAdmin from '../views/GeneralAdmin'
import About from '../views/About'
import { userKey } from "@/global";

Vue.use(VueRouter)

const routes = [{
  name: 'home',
  path: '/',
  component: Home,
  meta: {
    title: "Seleção de recurso",
  }
},
{
  name: 'schedule',
  path: '/schedule',
  component: Schedule,
  meta: {
    title: "Quadro de horários",
  }
},
{
  name: 'teacher',
  path: '/teacher',
  component: TeacherPage,
  meta: {
    title: "Página do Professor",
  }
},
{
  name: 'about',
  path: '/about',
  component: About,
  meta: {
    title: "Sobre",
  }
},
{
  name: 'resourcesAdmin',
  path: '/resourcesAdmin',
  component: ResourcesAdmin,
  meta: {
    resourcesAdmin: true,
    title: "Adm de Recursos",
  },
},
{
  name: 'generalAdmin',
  path: '/generalAdmin',
  component: GeneralAdmin,
  meta: {
    generalAdmin: true,
    title: "Adm geral",
  },
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