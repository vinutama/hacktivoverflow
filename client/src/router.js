import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "listQuestion" */ '@/components/QuestionList.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/components/FormRegister.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/components/FormLogin.vue')
        },
        {
          path: 'askquestion',
          name: 'askquestion',
          component: () => import(/* webpackChunkName: "askquestion" */ '@/components/AskQuestion.vue')
        },
        {
          path: '/:questionId',
          name: 'questiondetail',
          component: () => import(/* webpackChunkName: "questiondetail" */ '@/components/QuestionDetail.vue')
        },
        {
          path: '/question/mine',
          name: 'myquestionlist',
          component: () => import(/* webpackChunkName: "myquestionlist" */ '@/components/MyQuestion.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
