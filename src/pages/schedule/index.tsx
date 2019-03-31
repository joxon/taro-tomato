import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { ViewMode, ITask, ITab } from './index.d'
import TaskView from './TaskView'
import WeekView from './WeekView'

import './index.scss'

interface IState {
  readonly tabs: ITab[]
  viewMode: ViewMode
  tasks: ITask[]
}

const defaultState: IState = {
  tabs: [
    { name: '日程视图', viewMode: 'TaskView' },
    { name: '一周视图', viewMode: 'WeekView' }
  ],
  viewMode: 'TaskView',
  tasks: [
    {
      name: '写作业',
      weekday: 'Sat',
      startTime: new Date(),
      endTime: new Date(),
      tomatoBonus: 10
    },
    {
      name: '读书',
      weekday: 'Sat',
      startTime: new Date(),
      endTime: new Date(),
      tomatoBonus: 10
    },
    {
      name: '篮球班',
      weekday: 'Sat',
      startTime: new Date(),
      endTime: new Date(),
      tomatoBonus: 10
    }
  ]
}

export default class Schedule extends Component<{}, IState> {
  config: Config = {
    // navigationBarTitleText: '小番茄日程'
  }

  state: IState = defaultState

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

  render () {
    const { tabs, viewMode, tasks } = this.state
    return (
      <View className='schedule-wrapper'>
        <View className='tab-bar'>
          {tabs.map((tab, index) => (
            <View
              className={viewMode === tab.viewMode ? 'tab current' : 'tab'}
              onClick={this.handleViewSwitching.bind(this)}
              key={index}
            >
              {tab.name}
            </View>
          ))}
        </View>

        <View hidden={viewMode !== 'TaskView'}>
          <TaskView tasks={tasks} />
        </View>

        <View hidden={viewMode !== 'WeekView'}>
          <WeekView tasks={tasks} />
        </View>
      </View>
    )
  }
}
