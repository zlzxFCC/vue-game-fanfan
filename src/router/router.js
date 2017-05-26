import App from '../App'

const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const game = r => require.ensure([], () => r(require('../page/game')), 'game')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/index'
        },
        {
          path: '/index',
          component: index,
        },
        {
          path: '/game',
          component: game,
        }
    ]
}]
