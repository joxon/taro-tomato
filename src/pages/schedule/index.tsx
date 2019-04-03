import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { FontAwesome } from 'taro-icons'

import { TWeekday, TViewMode, ITask, ITab, IDay } from './index.d'
import TaskView from './TaskView'
import WeekView from './WeekView'
import WEEKDAYS from './WEEKDAYS'
import './index.scss'

interface IState {
  today: TWeekday
  viewMode: TViewMode
  tasks: ITask[]
}

const defaultState: IState = {
  today: 'Mon',
  viewMode: 'TaskView',
  tasks: [
    {
      name: '写作业',
      weekday: 'Sat',
      startHour: ' 8 AM',
      endHour: '10 AM',
      startMinute: '00',
      endMinute: '00',
      tomatoBonus: 10
    },
    {
      name: '读书',
      weekday: 'Sat',
      startHour: '11 AM',
      endHour: '11 AM',
      startMinute: '00',
      endMinute: '30',
      tomatoBonus: 10
    },
    {
      name: '篮球班',
      weekday: 'Sat',
      startHour: ' 3 PM',
      endHour: ' 5 PM',
      startMinute: '00',
      endMinute: '00',
      tomatoBonus: 10
    }
  ]
}

export default class Schedule extends Component<{}, IState> {
  state: IState = defaultState

  readonly TABS: ITab[] = [
    { name: '日程视图', viewMode: 'TaskView' },
    { name: '一周视图', viewMode: 'WeekView' }
  ]

  recentWeekdays: IDay[]

  getRecentWeekdays: () => IDay[] = () => {
    const weekdays: IDay[] = []

    const d = new Date()
    const todaysWeekday = d.getDay() - 1 // getDay返回1-7

    for (let i = 0; i < WEEKDAYS.length; ++i) {
      const day = WEEKDAYS[(i + todaysWeekday) % WEEKDAYS.length]

      const daysMonth = d.getMonth() + 1 // getMonth返回0-11
      const daysDay = d.getDate() // getDate返回1-31
      day.date = `${daysMonth}-${daysDay}`
      weekdays.push(day)

      d.setDate(d.getDate() + 1)
    }

    return weekdays
  }

  constructor () {
    super()
    this.recentWeekdays = this.getRecentWeekdays()
  }

  componentWillMount () {
    //
  }

  componentDidMount () {
    // TODO 获取远端数据
  }

  handleViewSwitching () {
    const { viewMode } = this.state
    if (viewMode === 'TaskView') {
      this.setState({
        viewMode: 'WeekView'
      })
    } else {
      this.setState({
        viewMode: 'TaskView'
      })
    }
  }

  navigateToTaskAdd () {
    Taro.navigateTo({ url: 'taskAdd' })
  }

  render () {
    const { viewMode, tasks } = this.state
    const { recentWeekdays } = this
    return (
      <View className='schedule-wrapper'>
        <View className='tab-bar'>
          {this.TABS.map((tab, index) => (
            <View
              className={viewMode === tab.viewMode ? 'tab current' : 'tab'}
              onClick={this.handleViewSwitching}
              key={index}
            >
              {tab.name}
            </View>
          ))}
        </View>

        <View className='view-wrapper'>
          <View hidden={viewMode !== 'TaskView'}>
            <TaskView tasks={tasks} recentWeekdays={recentWeekdays} />
          </View>

          <View hidden={viewMode !== 'WeekView'}>
            <WeekView tasks={tasks} recentWeekdays={recentWeekdays} />
          </View>
        </View>

        <View className='add-button' onClick={this.navigateToTaskAdd}>
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
