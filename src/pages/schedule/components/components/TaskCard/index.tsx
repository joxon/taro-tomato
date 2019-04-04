import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

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
    return showStartTime ? (
      <AtCard
        title={task.name}
        extra={`+${task.tomatoBonus}`}
        onClick={this.navigateToTaskEdit}
      >
        <View>
          {`${
            task.startHour.includes('AM') ? '上午' : '下午'
          } ${task.startHour.slice(0, 2)}:${task.startMinute}`}
        </View>
      </AtCard>
    ) : (
      <View onClick={this.navigateToTaskEdit}>
        <View>{task.name}</View>
      </View>
    )
  }
}
