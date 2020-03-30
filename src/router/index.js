import Vue from 'vue'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import LangEn from '../../static/lang/en'
import LangZhCHS from '../../static/lang/zhchs'
import LangZhCHT from '../../static/lang/zhcht'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: "zhchs",
    messages: {
      'en': LangEn,
      'zhchs': LangZhCHS,
      'zhcht': LangZhCHT
    }
})

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Liveview = () => import('@/views/Liveview')
// const liveplay = () => import('@/views/widgets/liveplay')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      // name: 'Dashboard',
      component: TheContainer,
      children: [
        {
            path: 'dashboard',
            name: i18n.tc("message.left.dashboard"),
            component: Dashboard
        },{
            path: 'liveview',
            name: i18n.tc("message.left.live"),
            component: Liveview
        }
      ]
    }
  ]
})
