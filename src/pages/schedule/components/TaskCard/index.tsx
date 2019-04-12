import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import { ITask } from '../../index.d'
import DEFAULT_TASK from '../../constants/TASK'
import parseHour from '../../utils'

interface IProps {
  task: ITask
  showStartTime: boolean
}

export default class TaskCard extends Component<IProps, {}> {
  static defaultProps: IProps = {
    task: DEFAULT_TASK,
    showStartTime: true
  }

  navigateToTaskEdit () {
    Taro.navigateTo({ url: `./taskDetails?mode=edit` })
  }

  render () {
    const { task, showStartTime } = this.props

    // Error: 不必要的 else 分支，请遵从 ESLint consistent-return: https://eslint.org/docs/rules/consistent-return
    /* eslint consistent-return: "off" */

    return showStartTime ? (
      <AtCard
        title={task.name}
        extra={`+ ${task.tomatoBonus} 番茄`}
        onClick={this.navigateToTaskEdit}
      >
        <View>{`${parseHour(task.startHour)}:${task.startMinute}`}</View>
      </AtCard>
    ) : (
      <View onClick={this.navigateToTaskEdit}>
        <View>{task.name}</View>
      </View>
    )
  }
}
