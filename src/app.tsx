import Taro from '@tarojs/taro'

// https://github.com/Jeepeng/taro-icons#readme
// import 'taro-icons/scss/MaterialIcons.scss' // 112KB
// import 'taro-icons/scss/MaterialCommunityIcons.scss' // 495KB
// import 'taro-icons/scss/Ionicons.scss' // 134KB
import 'taro-icons/scss/FontAwesome.scss' // 322KB

// https://nervjs.github.io/taro-ui-theme-preview/
// https://taro-ui.aotu.io/#/docs/introduction
// https://taro-ui.aotu.io/#/docs/customizetheme
// import 'taro-ui/dist/style/index.scss' // 默认样式
import './static/styles/custom-theme.scss' // 自定义样式

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
    pages: [
      'pages/schedule/index',
      'pages/schedule/taskDetails',
      'pages/tomato/index',
      'pages/dynamics/index'
    ],
    tabBar: {
      list: [
        {
          iconPath: 'static/images/node.png',
          selectedIconPath: 'static/images/node.png',
          pagePath: 'pages/schedule/index',
          text: '日程'
        },
        {
          iconPath: 'static/images/node.png',
          selectedIconPath: 'static/images/node.png',
          pagePath: 'pages/tomato/index',
          text: '番茄'
        },
        {
          iconPath: 'static/images/node.png',
          selectedIconPath: 'static/images/node.png',
          pagePath: 'pages/dynamics/index',
          text: '动态'
        }
      ],
      color: 'black',
      selectedColor: 'red',
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
