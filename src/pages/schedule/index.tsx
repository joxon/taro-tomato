import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
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
import { WEEKDAYS, DEFAULT_TASK_LIST } from './constants'

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

export default class Schedule extends Component<{}, IState> {
  static defaultState: IState = {
    today: 'Mon',
    viewMode: EViewMode.TaskView,
    tasks: DEFAULT_TASK_LIST
  }

  state: IState = Schedule.defaultState

  readonly TABLIST: ITab[] = [{ title: '日程视图' }, { title: '一周视图' }]

  recentWeekdays: IDay[]

  getRecentWeekdays (): IDay[] {
    const weekdays: IDay[] = []

    const d = new Date()

    // !!getDay返回0-6
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay#Return_value
    // An integer number, between 0 and 6,
    // corresponding to the day of the week for the given date,
    // according to local time:
    // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
    const todaysIndexTemp = d.getDay() - 1
    const todaysIndex = todaysIndexTemp === -1 ? 6 : todaysIndexTemp

    for (let i = 0; i < WEEKDAYS.length; ++i) {
      const day = WEEKDAYS[(i + todaysIndex) % WEEKDAYS.length]

      const daysMonth = d.getMonth() + 1 // getMonth返回0-11
      const daysDay = d.getDate() // getDate返回1-31

      day.date = `${daysMonth}-${daysDay}`
      weekdays.push(day)

      d.setDate(d.getDate() + 1)
    }

    return weekdays
  }

  componentWillMount () {
    this.recentWeekdays = this.getRecentWeekdays()
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
    this.$preload({ mode: 'add' })
    Taro.navigateTo({ url: 'taskDetails' })
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
