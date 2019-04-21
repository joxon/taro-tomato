import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { FontAwesome } from 'taro-icons'

import { IListItem } from './index.d'
import { DEFAULT_DAILY_ITEMS, DEFAULT_REWARD_ITEMS } from './constants'

import './list.scss'

type TListMode = 'reward' | 'daily'

interface IState {
  items: IListItem[]
}

interface IPreload {
  mode: TListMode
}
export default class TomatoList extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '番茄列表'
  }

  static defaultState: IState = {
    items: []
  }

  state: IState = TomatoList.defaultState
  preload: IPreload

  componentWillMount () {
    this.preload = this.$router.preload
    const { mode } = this.preload
    if (mode === 'daily') {
      this.setState({
        items: DEFAULT_DAILY_ITEMS
      })
    } else if (mode === 'reward') {
      this.setState({
        items: DEFAULT_REWARD_ITEMS
      })
    } else {
      Taro.showToast({ title: '模式传参错误' })
    }
  }

  navigateToItemEdit (item: IListItem) {
    this.$preload({
      ...item,
      editMode: 'edit',
      itemMode: this.preload.mode
    })
    Taro.navigateTo({
      url: 'item'
    })
  }

  navigateToItemAdd () {
    this.$preload({
      editMode: 'add',
      itemMode: this.preload.mode
    })
    Taro.navigateTo({
      url: 'item'
    })
  }

  render () {
    return (
      <View className='list-wrapper'>
        <AtList>
          {this.state.items.map((item, index) => (
            <AtListItem
              key={index + item.name}
              onClick={this.navigateToItemEdit.bind(this, item)}
              arrow='right'
              title={item.name}
              extraText={`${item.tomato > 0 ? '奖励' : '消耗'} ${Math.abs(
                item.tomato
              )} 番茄`}
            />
          ))}
        </AtList>
        <View className='add-button' onClick={this.navigateToItemAdd}>
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
}
