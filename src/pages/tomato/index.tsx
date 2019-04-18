import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import TaroUI from 'taro-ui'

import { IRecord } from './index.d'
import { DEFAULT_RECORD_LIST } from './constants'
import ListView from './components/ListView'

import './index.scss'

interface IState {
  records: IRecord[]
}

export default class Tomato extends Component<{}, IState> {
  static defaultState: IState = {
    records: DEFAULT_RECORD_LIST
  }

  state: IState = Tomato.defaultState

  render () {
    return (
      <View className='tomato-wrapper'>
        <ListView records={this.state.records} />
      </View>
    )
  }
}
