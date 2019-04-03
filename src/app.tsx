import Taro from '@tarojs/taro'
import 'taro-icons/scss/FontAwesome.scss'

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
      'pages/schedule/taskAdd',
      'pages/schedule/taskEdit',
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
