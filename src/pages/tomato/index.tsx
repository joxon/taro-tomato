import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtAvatar, AtList, AtListItem, AtSearchBar } from 'taro-ui'

import { IRecord } from './index.d'
import { DEFAULT_RECORD_LIST } from './constants'
import { toTitleString } from './utils'

import TOMATO_PNG from './images/tomato.png'
import './index.scss'

interface IState {
  records: IRecord[]
  tomato: number
  searchKeyword: string
}

export default class Tomato extends Component<{}, IState> {
  static defaultState: IState = {
    records: DEFAULT_RECORD_LIST,
    tomato: 100,
    searchKeyword: ''
  }

  state: IState = Tomato.defaultState

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
              mode='rect'
              columnNum={2}
              data={[
                {
                  image: TOMATO_PNG,
                  value: '兑换奖励'
                },
                {
                  image: TOMATO_PNG,
                  value: '日常奖惩'
                }
              ]}
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
