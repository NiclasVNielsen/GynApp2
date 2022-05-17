import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import CreateSymptom from '../views/CreateSymptom.vue'
import CreateReport from '../views/CreateReport.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/createsymptom',
    name: 'createsymptom',
    component: CreateSymptom
  },
  {
    path: '/createreport',
    name: 'createreport',
    component: CreateReport
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
