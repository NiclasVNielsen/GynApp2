import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import CreateSymptom from '../views/CreateSymptom.vue'
import CreateDrug from '../views/CreateDrug.vue'
import CreateSymptomCategory from '../views/CreateSymptomCategory.vue'
import CreateReport from '../views/CreateReport.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Graph from '../views/Graph.vue'
import Profile from '../views/Profile.vue'

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
    path: '/createdrug/:type',
    name: 'createdrug',
    component: CreateDrug
  },
  {
    path: '/createsymptomcategory',
    name: 'createsymptomcategory',
    component: CreateSymptomCategory
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
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
