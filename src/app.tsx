import Taro from '@tarojs/taro'

// https://github.com/Jeepeng/taro-icons#readme
// import 'taro-icons/scss/MaterialIcons.scss' // 112KB
// import 'taro-icons/scss/MaterialCommunityIcons.scss' // 495KB
// import 'taro-icons/scss/Ionicons.scss' // 134KB
import 'taro-icons/scss/FontAwesome.scss' // 322KB

// https://nervjs.github.io/taro-ui-theme-preview/
// https://taro-ui.aotu.io/#/docs/introduction
// https://taro-ui.aotu.io/#/docs/customizetheme
// !!微信开发者工具->调试基础库需要大于2.2.3
// import 'taro-ui/dist/style/index.scss' // 默认样式
// import './assets/styles/taro-ui.css' // 自定义样式，单文件版本
// import './assets/styles/custom-theme.scss' // 自定义样式，开发版本

import Index from './pages/index'
import './app.scss'

class App extends Taro.Component {
  config: Taro.Config = {
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ff0000',
      navigationBarTitleText: '小番茄',
      navigationBarTextStyle: 'white'
      // navigationStyle: 'custom'
    },
    // app.json pages中的route，会依照设置的顺序进行编译检查，
    // 只要有错误的page，访问下面的page就会报楼主说的错误，
    // 所以 @Sincere Xie说的位置往前移动，是可以解决的，只要移动到没有错误的page页面。
    pages: [
      'pages/schedule/index',
      'pages/schedule/tomatoClock',
      'pages/schedule/taskDetails',
      'pages/tomato/index',
      'pages/dynamics/index'
    ],
    tabBar: {
      list: [
        {
          iconPath: 'assets/images/tasks-off.png',
          selectedIconPath: 'assets/images/tasks-on.png',
          pagePath: 'pages/schedule/index',
          text: '日程'
        },
        {
          iconPath: 'assets/images/seedling-off.png',
          selectedIconPath: 'assets/images/seedling-on.png',
          pagePath: 'pages/tomato/index',
          text: '番茄'
        },
        {
          iconPath: 'assets/images/user-friends-off.png',
          selectedIconPath: 'assets/images/user-friends-on.png',
          pagePath: 'pages/dynamics/index',
          text: '动态'
        }
      ],
      color: '#333333',
      selectedColor: '#fa8072',
      backgroundColor: '#eeeeee',
      borderStyle: 'white'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
