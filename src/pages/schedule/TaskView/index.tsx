import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ITask } from '../index.d'
import './index.scss'

interface IProps {
  tasks: ITask[]
}

export default class TaskView extends Component<IProps, {}> {
  render () {
    const { tasks } = this.props
    return (
      <View className='task-view-wrapper'>
        {tasks.map((task, index) => (
          <View className='task-item-wrapper' key={index}>
            <Text>{task.name}</Text>
          </View>
        ))}
      </View>
    )
  }
}
