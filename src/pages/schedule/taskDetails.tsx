import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Label } from '@tarojs/components'
import {
  PickerTimeProps,
  PickerSelectorProps
} from '@tarojs/components/types/Picker'
import { BaseEventOrig, CommonEvent } from '@tarojs/components/types/common'
import { AtButton, AtForm, AtInput, AtInputNumber } from 'taro-ui'

import { TWeekday, THour, TMinute } from './index.d'
import { DEFAULT_TASK, WEEKDAYS } from './constants'
import { parseTimeToNumber } from './utils'

import './taskDetails.scss'

type TPageMode = 'add' | 'edit'

interface IState {
  mode: TPageMode // taskDetails
  id?: string // ITask
  name: string // ITask
  weekday: TWeekday // ITask
  weekdayName: string // taskDetails
  weekdayIndex: number // taskDetails
  startHour: THour // ITask
  startMinute: TMinute // ITask
  startTime: string // hh:mm, taskDetails
  endHour: THour // ITask
  endMinute: TMinute // ITask
  endTime: string // hh:mm, taskDetails
  tomatoBonus: number // ITask
}

export default class TaskDetails extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '任务详情'
  }

  static defaultState: IState = {
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

  state: IState = TaskDetails.defaultState

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
      const startTime = `${preload.startHour}:${preload.startMinute}`
      const endTime = `${preload.endHour}:${preload.endMinute}`

      this.setState({
        ...preload,
        weekdayIndex,
        weekdayName,
        startTime,
        endTime
      })
    }
  }

  onSubmit (event: CommonEvent) {
    console.log(event)
    console.log(this.state)
  }

  onReset (event: any) {
    console.log(event)
    this.setState(TaskDetails.defaultState)
  }

  handleNameInput (name: string) {
    this.setState({ name })
  }

  handleWeekdayPicker (event: BaseEventOrig<PickerSelectorProps>) {
    const val: number = event.detail.value

    this.setState({
      weekdayIndex: val,
      weekday: WEEKDAYS[val].weekday,
      weekdayName: WEEKDAYS[val].weekdayName
    })
  }

  handleStartTimePicker (event: BaseEventOrig<PickerTimeProps>) {
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

  handleEndTimePicker (event: BaseEventOrig<PickerTimeProps>) {
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
      const endTimeParts = endTime.split(':')
      const endHour = endTimeParts[0] as THour
      const endMinute = endTimeParts[1] as TMinute
      this.setState({ endTime, endHour, endMinute })
    }
  }

  handleTomatoInputNumber (tomatoBonus: number) {
    this.setState({
      tomatoBonus
    })
  }

  // redirectToTomatoClock (task: ITask) {
  //   this.$preload({
  //     name: task.name,
  //     tomatoBonus: task.tomatoBonus
  //   })
  //   Taro.navigateTo({
  //     url: `tomatoClock`
  //   })
  // }

  render () {
    const { mode, ...task } = this.state

    const taskNameInput = (
      <AtInput
        name='taskName'
        title='任务名称'
        type='text'
        placeholder='给任务起个名字吧~'
        value={task.name}
        onChange={this.handleNameInput}
      />
    )

    const taskWeekdayPicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>任务周次</Label>
          <Picker
            className='at-input__input'
            mode='selector'
            range={WEEKDAYS.map(day => day.weekdayName)}
            value={task.weekdayIndex}
            onChange={this.handleWeekdayPicker}
          >
            {task.weekdayName}
          </Picker>
        </View>
      </View>
    )

    const taskStartTimePicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>开始时间</Label>
          <Picker
            className='at-input__input'
            mode='time'
            value={task.startTime}
            onChange={this.handleStartTimePicker}
          >
            {task.startTime}
          </Picker>
        </View>
      </View>
    )

    const taskEndTimePicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>结束时间</Label>
          <Picker
            className='at-input__input'
            mode='time'
            value={task.endTime}
            onChange={this.handleEndTimePicker}
          >
            {task.endTime}
          </Picker>
        </View>
      </View>
    )

    const taskTomatoInputNumber = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>番茄奖励</Label>
          <AtInputNumber
            className='at-input__input'
            type='digit'
            min={10}
            max={100}
            step={10}
            value={task.tomatoBonus}
            onChange={this.handleTomatoInputNumber}
          />
        </View>
      </View>
    )

    const buttons =
      mode === 'add' ? (
        <View>
          <AtButton type='primary' formType='submit'>
            添加任务
          </AtButton>
          <AtButton type='secondary' formType='reset'>
            重新填写
          </AtButton>
        </View>
      ) : (
        <View>
          <AtButton type='primary' formType='submit'>
            保存任务
          </AtButton>
          {/* <AtButton
            type='secondary'
            onClick={this.redirectToTomatoClock.bind(this, task)}
          >
            启动番茄钟
          </AtButton> */}
          <AtButton type='secondary'>删除任务</AtButton>
        </View>
      )

    return (
      <AtForm
        className='form'
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        {taskNameInput}
        {taskWeekdayPicker}
        {taskStartTimePicker}
        {taskEndTimePicker}
        {taskTomatoInputNumber}
        {buttons}
      </AtForm>
    )
  }
}
