import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SimpleTwitter from '@/views/SimpleTwitter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/twitter',
      name: 'SimpleTwitter',
      component: SimpleTwitter
    }
  ]
})
