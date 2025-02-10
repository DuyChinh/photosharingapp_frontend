import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        console.log(userData);
        
        if (userData?.email) {
          return '/home'
        }
        return '/login'
      },
    },
  
    ...routes,
  ], 
})

export default router
