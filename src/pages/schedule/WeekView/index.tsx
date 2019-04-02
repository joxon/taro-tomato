import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ITask, IDay } from '../index.d'
import WEEKDAYS from '../WEEKDAYS'

interface IProps {
  tasks: ITask[]
  recentWeekdays: IDay[]
}

export default class WeekView extends Component<IProps, {}> {
  // 此处要加static，否则微信端报错
  static defaultProps: IProps = {
    tasks: [],
    recentWeekdays: []
  }

  render () {
    const { tasks, recentWeekdays } = this.props
    return (
      <View className='week-view'>
        <View className='header'>
          <View className='header-left' />
          <View className='header-right'>
            {WEEKDAYS.map(day => (
              <View className='header-right-column' key={day.weekday}>
                {day.weekdayName}
              </View>
            ))}
          </View>
        </View>

        <View className='content'>
          <Text>asd</Text>
        </View>
      </View>
    )
  }
}
