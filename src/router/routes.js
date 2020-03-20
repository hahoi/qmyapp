const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/Signup', component: () => import('pages/Signup.vue') }

    ]
  }
]

export const powerRouter = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Index', component: () => import('pages/Index.vue') },
      { path: '/Posts', component: () => import('pages/Posts.vue') },
      { path: '/Profile', component: () => import('pages/Profile.vue') }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
