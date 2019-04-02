import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { FontAwesome } from 'taro-icons'

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

  render () {
    const { tasks, recentWeekdays } = this.props
    return (
      <View className='task-view-wrapper'>
        {tasks.length === 0 ? (
          <View className='task-empty'>
            <Text>目前没有任务哦，快去添加一个吧！</Text>
          </View>
        ) : (
          recentWeekdays.map(day => (
            <View className='task-weekday-wrapper' key={day.weekday}>
              <Text>
                {`${day.date} ${day.weekdayName} ${day.weekday} `}
                {day.weekday === recentWeekdays[0].weekday ? '今天' : ''}
                {day.weekday === recentWeekdays[1].weekday ? '明天' : ''}
                {day.weekday === recentWeekdays[2].weekday ? '后天' : ''}
              </Text>

              {tasks.filter(task => task.weekday === day.weekday).length ===
              0 ? (
                  <View className='task-item'>
                    <Text>今天没有任务哦</Text>
                  </View>
                ) : (
                  tasks
                    .filter(task => task.weekday === day.weekday)
                    .map((task, taskIdx) => (
                      <View className='task-item' key={taskIdx}>
                        <Text>{task.name}</Text>
                      </View>
                    ))
                )}
            </View>
          ))
        )}
        <View className='add-button'>
          <FontAwesome
            family='solid'
            name='plus-circle'
            size={50}
            color='#ff0000'
          />
        </View>
      </View>
    )
  }
}
