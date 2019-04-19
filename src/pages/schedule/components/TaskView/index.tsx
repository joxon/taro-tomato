import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import { ITask, IDay } from '../../index.d'
import TaskCard from '../TaskCard'
import { parseTimeToNumber } from '../../utils'

import './index.scss'

// Prop Types
// https://reactjs.org/docs/typechecking-with-proptypes.html
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
    this.$preload('mode', 'add')
    Taro.navigateTo({ url: 'taskDetails' })
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

    const d = new Date()
    const h = d.getHours()
    const m = d.getMinutes()
    const now = h * 100 + m

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
                    <AtCard>{'<点击添加>'}</AtCard>
                  </View>
                ) : (
                  tasks.map(task =>
                    task.weekday === day.weekday ? (
                      <View
                        className='task-card'
                        key={task.weekday + task.startHour + task.name}
                      >
                        <TaskCard
                          task={task}
                          showStartTime
                          // 任务属于今天，而且当前时间在任务规定时间内
                          showTomatoClockButton={
                            day.weekday === recentWeekdays[0].weekday &&
                            parseTimeToNumber({
                              hour: task.startHour,
                              minute: task.startMinute
                            }) <= now &&
                            now <=
                              parseTimeToNumber({
                                hour: task.endHour,
                                minute: task.endMinute
                              })
                          }
                        />
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
