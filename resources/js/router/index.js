import { createRouter, createWebHistory } from 'vue-router'
import { useAlertStore } from '@/stores/alert.store'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async to => {
  // clear alert on route change
  const alertStore = useAlertStore()

  alertStore.clear()

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath
    
    return '/login'
  }
})

export default router
