import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/common/list'
import transferDemo from '@/views/demos/transferDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/transferDemo',
      name: 'transferDemo',
      component: transferDemo
    }
  ]
})
