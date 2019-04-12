import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab } from 'taro-ui'
import { FontAwesome } from 'taro-icons'

// import {
//   MaterialIcons,
//   MaterialCommunityIcons,
//   Ionicons,
//   FontAwesome,
// } from 'taro-icons'

import { TWeekday, ITask, IDay, ITab } from './index.d'
import TaskView from './components/TaskView'
import WeekView from './components/WeekView'
import WEEKDAYS from './constants/WEEKDAYS'

import './index.scss'

enum EViewMode {
  'TaskView' = 0,
  'WeekView' = 1
}

interface IState {
  today: TWeekday
  viewMode: EViewMode
  tasks: ITask[]
}

const defaultState: IState = {
  today: 'Mon',
  viewMode: EViewMode.TaskView,
  tasks: [
    {
      name: '写作业',
      weekday: 'Sat',
      startHour: '08',
      endHour: '10',
      startMinute: '00',
      endMinute: '00',
      tomatoBonus: 10
    },
    {
      name: '读书',
      weekday: 'Sat',
      startHour: '11',
      endHour: '11',
      startMinute: '00',
      endMinute: '30',
      tomatoBonus: 10
    },
    {
      name: '篮球班',
      weekday: 'Sat',
      startHour: '15',
      endHour: '17',
      startMinute: '00',
      endMinute: '00',
      tomatoBonus: 10
    }
  ]
}

export default class Schedule extends Component<{}, IState> {
  state: IState = defaultState

  readonly TABLIST: ITab[] = [{ title: '日程视图' }, { title: '一周视图' }]

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
    if (viewMode === EViewMode.TaskView) {
      this.setState({
        viewMode: EViewMode.WeekView
      })
    } else {
      this.setState({
        viewMode: EViewMode.TaskView
      })
    }
  }

  navigateToTaskAdd () {
    Taro.navigateTo({ url: 'taskDetails?mode=add' })
  }

  render () {
    const { viewMode, tasks } = this.state
    const { recentWeekdays } = this

    return (
      <View className='schedule-wrapper'>
        <AtTabs
          current={viewMode}
          tabList={this.TABLIST}
          onClick={this.handleViewSwitching}
        >
          <AtTabsPane current={viewMode} index={0}>
            <TaskView tasks={tasks} recentWeekdays={recentWeekdays} />
          </AtTabsPane>
          <AtTabsPane current={viewMode} index={1}>
            <WeekView tasks={tasks} recentWeekdays={recentWeekdays} />
          </AtTabsPane>
        </AtTabs>

        <View className='add-button' onClick={this.navigateToTaskAdd}>
          <FontAwesome
            family='solid'
            name='plus-circle'
            size={40}
            color='#ff0000'
          />
        </View>
      </View>
    )
  }
  // <MaterialIcons name='add-circle' size={50} color='#ff0000' />
  // <MaterialIcons name='settings' size={24} color='#000000' />
  // <MaterialCommunityIcons name='account' size={32} color='#000000' />
  // <Ionicons name='ios-woman' size={32} color='pink' />
  // <FontAwesome family='brands' name='weixin' size={32} />
}
