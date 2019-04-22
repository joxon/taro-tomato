import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Label } from '@tarojs/components'
import { PickerSelectorProps } from '@tarojs/components/types/Picker'
import { BaseEventOrig, CommonEvent } from '@tarojs/components/types/common'
import { AtButton, AtForm, AtInput } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import { TSex, TSexName, TAge } from './index.d'
import { AGES, SEXNAMES, MINUTES_TO_REST, MINUTES_TO_WORK } from './constants'

interface IProps {
  store: any
}

interface IState {
  name: string
  sex: TSex
  sexIndex: number
  sexName: TSexName
  age: TAge
  secondsToRest: number
  minutesToRest: number
  secondsToWork: number
  minutesToWork: number
}

@inject('store')
@observer
export default class Settings extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '我的设定'
  }

  static defaultState: IState = {
    name: '',
    sex: 'M',
    sexIndex: 0,
    sexName: '男',
    age: '3',
    secondsToRest: 0,
    minutesToRest: 0,
    secondsToWork: 0,
    minutesToWork: 0
  }

  state: IState = Settings.defaultState

  componentWillMount () {
    const {
      store: { secondsToWork, secondsToRest }
    } = this.props

    this.setState({
      secondsToWork,
      minutesToWork: secondsToWork / 60,
      secondsToRest,
      minutesToRest: secondsToRest / 60
    })
  }

  onSubmit (event: CommonEvent) {
    console.log(event)
    console.log(this.state)
  }

  handleNameInput (name: string) {
    this.setState({ name })
  }

  handleSexPicker (event: BaseEventOrig<PickerSelectorProps>) {
    const val: number = event.detail.value
    if (val === 0) {
      this.setState({
        sex: 'M',
        sexName: '男',
        sexIndex: 0
      })
    } else {
      this.setState({
        sex: 'F',
        sexName: '女',
        sexIndex: 1
      })
    }
  }

  handleAgePicker (event: BaseEventOrig<PickerSelectorProps>) {
    const val: number = event.detail.value
    this.setState({
      age: val.toString() as TAge
    })
  }

  handleMinutesToRestPicker (event: BaseEventOrig<PickerSelectorProps>) {
    const val: number = event.detail.value
    const minutesToRest = MINUTES_TO_REST[val]
    this.setState({
      minutesToRest,
      secondsToRest: minutesToRest * 60
    })
  }

  handleMinutesToWorkPicker (event: BaseEventOrig<PickerSelectorProps>) {
    const val: number = event.detail.value
    const minutesToWork = MINUTES_TO_WORK[val]
    this.setState({
      minutesToWork,
      secondsToWork: minutesToWork * 60
    })
  }

  render () {
    const { ...user } = this.state

    const userNameInput = (
      <AtInput
        name='userName'
        title='昵称'
        type='text'
        placeholder='给自己起个名字吧~'
        value={user.name}
        onChange={this.handleNameInput}
      />
    )

    const sexPicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>性别</Label>
          <Picker
            className='at-input__input'
            mode='selector'
            range={SEXNAMES}
            value={user.sexIndex}
            onChange={this.handleSexPicker}
          >
            {user.sexName}
          </Picker>
        </View>
      </View>
    )

    const agePicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>年龄</Label>
          <Picker
            className='at-input__input'
            mode='selector'
            range={AGES}
            value={parseInt(user.age)}
            onChange={this.handleAgePicker}
          >
            {user.age}岁
          </Picker>
        </View>
      </View>
    )

    const minutesToRestPicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>休息时长</Label>
          <Picker
            className='at-input__input'
            mode='selector'
            range={MINUTES_TO_REST}
            value={MINUTES_TO_REST.indexOf(user.minutesToRest)}
            onChange={this.handleMinutesToRestPicker}
          >
            {user.minutesToRest}分钟
          </Picker>
        </View>
      </View>
    )

    const minutesToWorkPicker = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>工作时长</Label>
          <Picker
            className='at-input__input'
            mode='selector'
            range={MINUTES_TO_WORK}
            value={MINUTES_TO_WORK.indexOf(user.minutesToWork)}
            onChange={this.handleMinutesToWorkPicker}
          >
            {user.minutesToWork}分钟
          </Picker>
        </View>
      </View>
    )

    const buttons = (
      <View>
        <AtButton type='primary' formType='submit'>
          保存修改
        </AtButton>
      </View>
    )

    return (
      <AtForm className='form' onSubmit={this.onSubmit.bind(this)}>
        {userNameInput}
        {sexPicker}
        {agePicker}
        {minutesToWorkPicker}
        {minutesToRestPicker}
        {buttons}
      </AtForm>
    )
  }
}
