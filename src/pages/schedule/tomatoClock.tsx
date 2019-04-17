import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { FontAwesome } from 'taro-icons'

import { TMinute, TSecond } from './index.d'
import TOMATO_PNG from './images/tomato.png'

import './tomatoClock.scss'

interface IState {
  uiMinute: TMinute
  uiSecond: TSecond
}

export default class TomatoClock extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '番茄钟'
  }

  static defaultState: IState = {
    uiMinute: '25',
    uiSecond: '00'
  }

  state: IState = TomatoClock.defaultState

  render () {
    // 以下代码会导致调用栈错误
    // const state = this.state
    return (
      <View className='clock'>
        <View className='clock-digital'>
          <Text className='min'>{this.state.uiMinute}</Text>
          <Text className='sec'>:{this.state.uiSecond}</Text>
        </View>
        <View className='clock-analog'>
          <Image src={TOMATO_PNG} />
        </View>
        <View className='clock-buttons'>
          <View className='button'>
            <FontAwesome
              family='regular'
              name='thumbs-up'
              size={40}
              color='#ff0000'
            />
          </View>
          <View className='button'>
            <FontAwesome
              family='regular'
              name='thumbs-down'
              size={40}
              color='#ff0000'
            />
          </View>
        </View>
      </View>
    )
  }
}
