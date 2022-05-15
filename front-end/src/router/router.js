import { createRouter, createWebHistory } from 'vue-router'

import TodoPage from "@/views/TodoPage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";

import token from '@/lib/auth'

const routes = [
  {
    path: '/',
    name: 'todos',
    component: TodoPage,
    meta: {requiresAuth: true},
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
