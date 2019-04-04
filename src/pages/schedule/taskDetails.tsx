import Taro, { Component, Config, ComponentOptions } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { AtButton, AtForm, AtInput, AtInputNumber } from 'taro-ui'

import { TWeekday, THour, TMinute } from './index.d'
import TaskFormFields from './components/TaskFormFields'
import './taskDetails.scss'

import DEFAULT_TASK from './constants/TASK'
import WEEKDAYS from './constants/WEEKDAYS'

type TPageMode = 'add' | 'edit'

interface IOptions extends ComponentOptions {
  mode: TPageMode
  taskName: string
  taskWeekday: TWeekday
  taskStartHour: THour
  taskStartMinute: TMinute
  taskEndHour: THour
  taskEndMinute: TMinute
  taskTomatoBonus: number
}

export default class taskDetails extends Component {
  config: Config = {
    navigationBarTitleText: '任务详情'
  }

  params: IOptions = {
    mode: 'add',
    taskName: DEFAULT_TASK.name,
    taskWeekday: DEFAULT_TASK.weekday,
    taskStartHour: DEFAULT_TASK.startHour,
    taskStartMinute: DEFAULT_TASK.startMinute,
    taskEndHour: DEFAULT_TASK.endHour,
    taskEndMinute: DEFAULT_TASK.endMinute,
    taskTomatoBonus: DEFAULT_TASK.tomatoBonus
  }

  state = {}

  componentWillMount () {
    this.params = this.$router.params
  }

  onSubmit (event: any) {
    console.log(event)
  }
  onReset (event: any) {
    console.log(event)
  }

  handleInput () {}

  render () {
    const { mode, ...task } = this.params

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
        value={mode === 'add' ? undefined : task.taskName}
        onChange={this.handleInput}
      />
    )

    const taskWeekdayPicker = (
      <View className='task-weekday-picker'>
        <Text>任务周次</Text>
        <View>
          <Picker
            mode='selector'
            range={WEEKDAYS.map(day => day.weekdayName)}
            value={
              mode === 'add'
                ? 0
                : WEEKDAYS.map(day => day.weekdayName).indexOf(task.taskWeekday)
            }
            onChange={this.handleInput}
          >
            <View>{WEEKDAYS.map(day => day.weekdayName)[0]}</View>
          </Picker>
        </View>
      </View>
    )

    const taskStartTimePicker = (
      <View className='task-weekday-picker'>
        <Text>开始时间</Text>
        <View>
          <Picker
            mode='time'
            value={
              mode === 'add'
                ? '08:00'
                : `${task.taskStartHour.slice(0, 2)}:${task.taskStartMinute}`
            }
            onChange={this.handleInput}
          >
            <View>08:00</View>
          </Picker>
        </View>
      </View>
    )

    const taskEndTimePicker = (
      <View className='task-weekday-picker'>
        <Text>结束时间</Text>
        <View>
          <Picker
            mode='time'
            value={
              mode === 'add'
                ? '09:00'
                : `${task.taskStartHour.slice(0, 2)}:${task.taskStartMinute}`
            }
            onChange={this.handleInput}
          >
            <View>09:00</View>
          </Picker>
        </View>
      </View>
    )

    const taskTomatoInputNumber = (
      <AtInputNumber
        type='digit'
        min={0}
        max={100}
        step={10}
        value={mode === 'add' ? 10 : task.taskTomatoBonus}
        onChange={this.handleInput}
      />
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
