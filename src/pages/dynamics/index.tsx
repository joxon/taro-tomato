import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Schedule extends Component {
  config: Config = {
    // navigationBarTitleText: '小番茄动态'
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View>
        <Text>动态</Text>
      </View>
    )
  }
}
