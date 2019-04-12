import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { ITask, IDay, TWeekday, THour } from '../../index.d'
import WEEKDAYS from '../../constants/WEEKDAYS'
import TaskCard from '../TaskCard'
import parseHour from '../../utils'

import './index.scss'

interface IProps {
  tasks: ITask[]
  recentWeekdays: IDay[]
}

export default class WeekView extends Component<IProps, {}> {
  // 此处要加static，否则微信端报错
  static defaultProps: IProps = {
    tasks: [],
    recentWeekdays: [
      {
        weekdayName: '周一',
        weekday: 'Mon',
        date: '1-1'
      },
      {
        weekdayName: '周二',
        weekday: 'Tue',
        date: '1-2'
      },
      {
        weekdayName: '周三',
        weekday: 'Wed',
        date: '1-3'
      },
      {
        weekdayName: '周四',
        weekday: 'Thu',
        date: '1-4'
      },
      {
        weekdayName: '周五',
        weekday: 'Fri',
        date: '1-5'
      },
      {
        weekdayName: '周六',
        weekday: 'Sat',
        date: '1-6'
      },
      {
        weekdayName: '周日',
        weekday: 'Sun',
        date: '1-7'
      }
    ]
  }

  readonly ROWS_HOUR: THour[] = [
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ]

  readonly COLS_WDAY: TWeekday[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ]

  render () {
    const { tasks, recentWeekdays } = this.props
    return (
      <View className='week-view'>
        <View className='header'>
          <View className='header-left' />
          <View className='header-right'>
            {WEEKDAYS.map(wDay => (
              <View
                className={`header-right-column ${
                  wDay.weekday === recentWeekdays[0].weekday
                    ? 'header-today'
                    : 'header-not-today'
                }`}
                key={wDay.weekday}
              >
                <View>{wDay.weekdayName}</View>
                <View>
                  {
                    recentWeekdays.filter(
                      rDay => rDay.weekday === wDay.weekday
                    )[0].date
                  }
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className='content'>
          {this.ROWS_HOUR.map(hour => (
            <View className='content-row' key={hour}>
              <View className='time-cell'>{`${parseHour(hour)} 点`}</View>

              <View className='tasks-row'>
                {this.COLS_WDAY.map(wday => (
                  <View className='task-cell' key={wday + hour}>
                    {tasks.map(task =>
                      task.weekday === wday && task.startHour === hour ? (
                        <View
                          className='task-card'
                          key={wday + hour + task.name}
                        >
                          <TaskCard task={task} showStartTime={false} />
                        </View>
                      ) : (
                        ''
                      )
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
