import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        if (userData.username) {
          return '/home'
        }
        return '/login'
      },
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../pages/Home/index.vue'),
    },
  
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notmatch',
    }
  ], 
})

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  if(to.path === '/login' && userData.username) {
    next(from.fullPath);
  }
  else if (to.path !== '/login' && !userData.username && to.path !== '/changepassword') {
    next('/login');
  } else {
    next();
  }
})

export default router
