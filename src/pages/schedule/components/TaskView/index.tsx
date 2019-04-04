import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import { ITask, IDay } from '../../index.d'
import TaskCard from '../components/TaskCard'
import './index.scss'

interface IProps {
  tasks: ITask[]
  recentWeekdays: IDay[]
}

export default class TaskView extends Component<IProps, {}> {
  // 此处要加static，否则微信端报错
  static defaultProps: IProps = {
    tasks: [],
    recentWeekdays: []
  }

  navigateToTaskAdd () {
    Taro.navigateTo({ url: './taskDetails?mode=add' })
  }

  render () {
    const vTaskEmpty = (
      <AtCard className='task-empty' onClick={this.navigateToTaskAdd}>
        <View>目前没有任务哦</View>
        <View>快去添加一个吧！</View>
      </AtCard>
    )

    // const vTaskNone = (
    //   <View className='task-item task-none' onClick={this.navigateToTaskAdd}>
    //     <Text>{'<空>'}</Text>
    //   </View>
    // )

    const { tasks, recentWeekdays } = this.props

    return (
      <View className='task-view'>
        {tasks.length === 0
          ? vTaskEmpty
          : recentWeekdays.map(day => (
            <View className='task-weekday' key={day.weekday}>
              <Text>
                {`${day.date} ${day.weekdayName} ${
                  day.weekday === recentWeekdays[0].weekday
                    ? '今天'
                    : day.weekday === recentWeekdays[1].weekday
                      ? '明天'
                      : day.weekday === recentWeekdays[2].weekday
                        ? '后天'
                        : ''
                }`}
              </Text>

              {tasks.filter(task => task.weekday === day.weekday).length ===
                0 ? ( // vTaskNone
                  <View
                    className='task-card task-none'
                    onClick={this.navigateToTaskAdd}
                  >
                    <AtCard>{'<空>'}</AtCard>
                  </View>
                ) : (
                  tasks.map(task =>
                    task.weekday === day.weekday ? (
                      <View
                        className='task-card'
                        key={task.weekday + task.startHour + task.name}
                      >
                        <TaskCard task={task} showStartTime />
                      </View>
                    ) : (
                      ''
                    )
                  )
                )}
            </View>
          ))}
      </View>
    )
  }
}
