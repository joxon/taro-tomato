import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { ITask } from '../index.d'

interface IProps {
  tasks: ITask[]
}

export default class TaskView extends Component<IProps, {}> {
  config: Config = {
    // navigationBarTitleText: '小番茄日程'
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return <View>一周视图</View>
  }
}
