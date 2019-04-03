import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ITask, IDay } from '../index.d'
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
    Taro.navigateTo({ url: './taskAdd' })
  }

  navigateToTaskEdit () {
    Taro.navigateTo({ url: './taskEdit' })
  }

  render () {
    const vTaskEmpty = (
      <View className='task-empty' onClick={this.navigateToTaskAdd}>
        <View>目前没有任务哦</View>
        <View>快去添加一个吧！</View>
      </View>
    )

    // const vTaskNone = (
    //   <View className='task-item task-none' onClick={this.navigateToTaskAdd}>
    //     <Text>{'<空>'}</Text>
    //   </View>
    // )

    const { tasks, recentWeekdays } = this.props

    return (
      <View className='task-view-wrapper'>
        {tasks.length === 0
          ? vTaskEmpty
          : recentWeekdays.map(day => (
            <View className='task-weekday-wrapper' key={day.weekday}>
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
                    className='task-item task-none'
                    onClick={this.navigateToTaskAdd}
                  >
                    <Text>{'<空>'}</Text>
                  </View>
                ) : (
                  tasks.map(task =>
                    task.weekday === day.weekday ? (
                      <View
                        className='task-item'
                        key={task.weekday + task.startHour + task.name}
                        onClick={this.navigateToTaskEdit}
                      >
                        <View>{task.name}</View>
                        <View>
                          {`${
                            task.startHour.includes('AM') ? '上午' : '下午'
                          } ${task.startHour.slice(0, 2)}:${task.startMinute}`}
                        </View>
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
