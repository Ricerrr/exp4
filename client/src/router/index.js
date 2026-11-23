import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import PostCreate from '../views/PostCreate.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts/:id', component: PostDetail },
  { path: '/create', component: PostCreate },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
