import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/Detail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/movie/Movie.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/tvShow',
    name: 'tvShow',
    component: () => import('@/views/tvShow/TvShow.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('@/views/classify/Classify.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/actor',
    name: 'actor',
    component: () => import('@/views/actor/Actor.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/moreDetail',
    name: 'moreDetail',
    component: () => import('@/views/moreDetail/MoreDetail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/Mine.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      keepAlive: false
    }
  }
]

export default routes;