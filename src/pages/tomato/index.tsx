import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtAvatar, AtList, AtListItem, AtSearchBar } from 'taro-ui'
import { Item } from 'taro-ui/@types/grid'

import { IRecord } from './index.d'
import { DEFAULT_RECORDS } from './constants'
import { toTitleString } from './utils'

import TOMATO_PNG from './images/tomato.png'
import './index.scss'

interface IState {
  records: IRecord[]
  tomato: number
  searchKeyword: string
}

const gridData: Item[] = [
  {
    image: TOMATO_PNG,
    value: '兑换奖励'
  },
  {
    image: TOMATO_PNG,
    value: '日常奖惩'
  }
]

export default class Tomato extends Component<{}, IState> {
  static defaultState: IState = {
    records: DEFAULT_RECORDS,
    tomato: 100,
    searchKeyword: ''
  }

  state: IState = Tomato.defaultState

  handleGridClick (_item: Item, index: number) {
    if (index === 0) {
      this.$preload('mode', 'reward')
    } else if (index === 1) {
      this.$preload('mode', 'daily')
    }
    Taro.navigateTo({ url: 'list' })
  }

  // navigateToRewardList () {
  //   this.$preload('mode', 'reward')
  //   Taro.navigateTo({ url: 'list' })
  // }

  // navigateToDailyList () {
  //   this.$preload('mode', 'daily')
  //   Taro.navigateTo({ url: 'list' })
  // }

  handleSearchBarChange (value: string) {
    this.setState({
      searchKeyword: value
    })
  }

  handleSearchBarClick () {
    console.log(this.state.searchKeyword)
  }

  render () {
    return (
      <View className='tomato-wrapper'>
        <View className='top-view'>
          <View className='info'>
            <View className='avatar'>
              <AtAvatar size='large' circle image={TOMATO_PNG} />
            </View>
            <View className='tomato'>
              <Text>已经收获了\n{this.state.tomato}个小番茄</Text>
            </View>
          </View>
          <View className='buttons'>
            <AtGrid
              onClick={this.handleGridClick}
              mode='rect'
              columnNum={2}
              data={gridData}
            />
          </View>
        </View>
        <View className='list-view'>
          <AtSearchBar
            value={this.state.searchKeyword}
            onChange={this.handleSearchBarChange}
            onActionClick={this.handleSearchBarClick}
          />
          <AtList>
            {this.state.records.map(record => (
              <AtListItem
                key={record.timestamp}
                title={toTitleString(record)}
                note={record.reason}
                extraText={record.timestamp}
              />
            ))}
          </AtList>
        </View>
      </View>
    )
  }
}
