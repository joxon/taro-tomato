import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtAvatar, AtList, AtListItem } from 'taro-ui'
import { Item } from 'taro-ui/@types/grid'

import { IPost } from './index.d'
import { DEFAULT_POSTS } from './constants'

import TOMATO_PNG from './images/tomato.png'
import './index.scss'

interface IState {
  posts: IPost[]
}

const gridData: Item[] = [
  {
    image: TOMATO_PNG,
    value: '我的设定'
  },
  {
    image: TOMATO_PNG,
    value: '我的班级'
  }
]

export default class Dynamics extends Component<{}, IState> {
  static defaultState: IState = {
    posts: DEFAULT_POSTS
  }

  state: IState = Dynamics.defaultState

  handleGridClick (_item: Item, index: number) {
    if (index === 0) {
      Taro.navigateTo({ url: 'settings' })
    } else if (index === 1) {
      Taro.navigateTo({ url: 'class' })
    }
  }

  render () {
    return (
      <View className='dynamics-wrapper'>
        <View className='top-view'>
          <View className='info'>
            <View className='avatar'>
              <AtAvatar size='large' circle image={TOMATO_PNG} />
            </View>
            <View className='user-name'>
              <Text>用户名</Text>
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
          <View className='title'>- 班级动态 -</View>
          <AtList>
            {this.state.posts.map(post => (
              <AtListItem
                key={post.timestamp}
                title={post.userName}
                note={post.content}
                extraText={post.timestamp.toString()}
              />
            ))}
          </AtList>
        </View>
      </View>
    )
  }
}
