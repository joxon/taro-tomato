import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import { ITask } from '../../index.d'
import { DEFAULT_TASK } from '../../constants'
import { parseHourToString } from '../../utils'

interface IProps {
  task: ITask
  showStartTime: boolean
}

export default class TaskCard extends Component<IProps, {}> {
  static defaultProps: IProps = {
    task: DEFAULT_TASK,
    showStartTime: true
  }

  navigateToTaskEdit (task: ITask) {
    this.$preload({
      mode: 'edit',
      ...task
    })
    Taro.navigateTo({ url: `taskDetails` })
  }

  render () {
    const { task, showStartTime } = this.props

    // Error: 不必要的 else 分支，请遵从 ESLint consistent-return: https://eslint.org/docs/rules/consistent-return
    /* eslint consistent-return: "off" */

    // onClick传参
    // https://nervjs.github.io/taro/docs/event.html#%E5%90%91%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E4%BC%A0%E9%80%92%E5%8F%82%E6%95%B0

    return showStartTime ? (
      <AtCard
        title={task.name}
        extra={`+ ${task.tomatoBonus} 番茄`}
        onClick={this.navigateToTaskEdit.bind(this, task)}
      >
        <View>{`${parseHourToString(task.startHour)}:${
          task.startMinute
        }`}</View>
      </AtCard>
    ) : (
      <View onClick={this.navigateToTaskEdit.bind(this, task)}>
        <View>{task.name}</View>
      </View>
    )
  }
}
