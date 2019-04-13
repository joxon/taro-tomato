import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { AtButton, AtForm, AtInput, AtInputNumber } from 'taro-ui'

import { TWeekday, THour, TMinute } from './index.d'
import { DEFAULT_TASK, WEEKDAYS } from './constants'

import './taskDetails.scss'
import { parseTimeToNumber } from './utils'

type TPageMode = 'add' | 'edit'

interface IState {
  mode: TPageMode
  id?: string
  name: string
  weekday: TWeekday
  weekdayName: string
  weekdayIndex: number
  startHour: THour
  startMinute: TMinute
  startTime: string // hh:mm
  endHour: THour
  endMinute: TMinute
  endTime: string // hh:mm
  tomatoBonus: number
}

export default class taskDetails extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '任务详情'
  }

  state: IState = {
    mode: 'add',
    name: DEFAULT_TASK.name,
    weekday: DEFAULT_TASK.weekday,
    weekdayName: '周一',
    weekdayIndex: 0,
    startHour: DEFAULT_TASK.startHour,
    startMinute: DEFAULT_TASK.startMinute,
    startTime: `${DEFAULT_TASK.startHour}:${DEFAULT_TASK.startMinute}`,
    endHour: DEFAULT_TASK.endHour,
    endMinute: DEFAULT_TASK.endMinute,
    endTime: `${DEFAULT_TASK.endHour}:${DEFAULT_TASK.endMinute}`,
    tomatoBonus: DEFAULT_TASK.tomatoBonus
  }

  componentWillMount () {
    // console.log('params: ')
    // console.log(this.$router.params)
    // console.log('preload: ')
    // console.log(this.$router.preload)

    const preload: IState = this.$router.preload
    if (preload.mode === 'edit') {
      const weekdayIndex = WEEKDAYS.map(day => day.weekday).indexOf(
        preload.weekday
      )
      const weekdayName = WEEKDAYS[weekdayIndex].weekdayName

      this.setState({
        ...preload,
        weekdayIndex,
        weekdayName
      })
    }
  }

  onSubmit (event: any) {
    console.log(event)
    console.log(this.state)
  }

  onReset (event: any) {
    console.log(event)
  }

  handleNameInput (name: string) {
    this.setState({ name })
  }

  handleWeekdayPicker (event: BaseEventOrig<any>) {
    const val: number = event.detail.value
    this.setState({
      weekdayIndex: val,
      weekday: WEEKDAYS[val].weekday,
      weekdayName: WEEKDAYS[val].weekdayName
    })
  }

  handleStartTimePicker (event: BaseEventOrig<any>) {
    const startTime: string = event.detail.value
    const startTimeNum = parseTimeToNumber(startTime)

    if (startTimeNum >= 2300 || startTimeNum < 500) {
      Taro.showToast({
        title: '该休息了，重选个时间吧~',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const startTimeParts = startTime.split(':')
    const startHour: THour = startTimeParts[0] as THour
    const startMinute: TMinute = startTimeParts[1] as TMinute
    const endMinute: TMinute = ((parseInt(startMinute, 10) + 30) % 60)
      .toString()
      .padStart(2, '0') as TMinute
    const endHour: THour =
      parseInt(endMinute) < parseInt(startMinute)
        ? ((parseInt(startHour) + 1).toString().padStart(2, '0') as THour)
        : startHour
    const endTime = `${endHour}:${endMinute}`

    this.setState({
      startTime,
      startHour,
      startMinute,
      endTime,
      endHour,
      endMinute
    })
  }

  handleEndTimePicker (event: BaseEventOrig<any>) {
    const endTime = event.detail.value
    const startTimeNum = parseTimeToNumber(this.state.startTime)
    const endTimeNum = parseTimeToNumber(endTime)

    if (endTimeNum < startTimeNum) {
      Taro.showToast({
        title: '结束时间不能早于开始时间哦~',
        icon: 'none',
        duration: 2000
      })
    } else if (endTimeNum >= 2300 || endTimeNum < 500) {
      Taro.showToast({
        title: '该休息了，重选个时间吧~',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setState({ endTime })
    }
  }

  handleTomatoInputNumber (tomatoBonus: number) {
    this.setState({
      tomatoBonus
    })
  }

  render () {
    const { mode, ...task } = this.state

    type ElementOrNothing = JSX.Element | undefined

    const addButtonGroup: ElementOrNothing =
      mode === 'add' ? (
        <View>
          <AtButton type='primary' formType='submit'>
            添加任务
          </AtButton>
          <AtButton type='secondary'>重新填写</AtButton>
        </View>
      ) : (
        undefined
      )

    const editButtonGroup: ElementOrNothing =
      mode === 'edit' ? (
        <View>
          <AtButton type='primary' formType='submit'>
            保存任务
          </AtButton>
          <AtButton type='secondary'>删除任务</AtButton>
        </View>
      ) : (
        undefined
      )

    const taskNameInput = (
      <AtInput
        name='taskName'
        title='任务名称'
        type='text'
        placeholder='给任务起个名字吧~'
        value={this.state.name}
        onChange={this.handleNameInput}
      />
    )

    const taskWeekdayPicker = (
      <View className='task-weekday-picker'>
        <Picker
          mode='selector'
          range={WEEKDAYS.map(day => day.weekdayName)}
          value={this.state.weekdayIndex as number}
          onChange={this.handleWeekdayPicker}
        >
          <View className='label'>任务周次</View>
          <View className='value'>{this.state.weekdayName}</View>
        </Picker>
      </View>
    )

    const taskStartTimePicker = (
      <View className='task-start-time-picker'>
        <Picker
          mode='time'
          value={this.state.startTime}
          onChange={this.handleStartTimePicker}
        >
          <View className='label'>开始时间</View>
          <View className='value'>{this.state.startTime}</View>
        </Picker>
      </View>
    )

    const taskEndTimePicker = (
      <View className='task-end-time-picker'>
        <Picker
          mode='time'
          value={this.state.endTime}
          onChange={this.handleEndTimePicker}
        >
          <View className='label'>结束时间</View>
          <View className='value'>{this.state.endTime}</View>
        </Picker>
      </View>
    )

    const taskTomatoInputNumber = (
      <View className='task-tomato-input-number'>
        <View className='label'>番茄奖励</View>
        <AtInputNumber
          className='value'
          type='digit'
          min={10}
          max={100}
          step={10}
          value={this.state.tomatoBonus}
          onChange={this.handleTomatoInputNumber}
        />
      </View>
    )

    return (
      <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        {taskNameInput}
        {taskWeekdayPicker}
        {taskStartTimePicker}
        {taskEndTimePicker}
        {taskTomatoInputNumber}
        {addButtonGroup}
        {editButtonGroup}
      </AtForm>
    )
  }
}
