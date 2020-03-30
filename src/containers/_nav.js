import Vue from 'vue'
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
export default [{
  _name: 'CSidebarNav',
  _children: [
    {
      _name: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'primary1',
        text: 'NEW'
      }
    },
    {
      _name: 'CSidebarNavItem',
      name: i18n.tc("message.archive.ManualRecord"),
      to: '/liveview',
      icon: 'cil-drop'
    }
  ]
}]