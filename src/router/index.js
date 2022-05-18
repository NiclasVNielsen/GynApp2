import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import CreateSymptom from '../views/CreateSymptom.vue'
import CreateReport from '../views/CreateReport.vue'
import Login from '../views/Login.vue'
import Graph from '../views/Graph.vue'

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
    path: '/createsymptom/:type',
    name: 'createsymptom',
    component: CreateSymptom
  },
  {
    path: '/createreport/:symptom',
    name: 'createreport',
    component: CreateReport
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
