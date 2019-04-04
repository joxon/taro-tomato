import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { ITask } from './../../../index.d'
import DEFAULT_TASK from '../../../constants/TASK'

interface IProps {
  task: ITask
  showStartTime: boolean
}

export default class index extends Component<IProps, {}> {
  static defaultProps: IProps = {
    task: DEFAULT_TASK,
    showStartTime: true
  }

  navigateToTaskEdit () {
    Taro.navigateTo({ url: `./taskDetails?mode=edit` })
  }

  render () {
    const { task, showStartTime } = this.props
    return (
      <View onClick={this.navigateToTaskEdit}>
        <View>{task.name}</View>
        <View hidden={!showStartTime}>
          {`${
            task.startHour.includes('AM') ? '上午' : '下午'
          } ${task.startHour.slice(0, 2)}:${task.startMinute}`}
        </View>
      </View>
    )
  }
}
