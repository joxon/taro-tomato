import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
  AtGrid,
  AtAvatar,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtTabs,
  AtTabsPane,
  AtInput,
  AtButton
} from 'taro-ui'
import { FontAwesome } from 'taro-icons'

import { ITab, IClassUser } from './index.d'
import { DEFAULT_CLASSMATES } from './constants'

import TOMATO_PNG from './images/tomato.png'
import './class.scss'

enum EJoinMode {
  'JOIN' = 0,
  'CREATE' = 1
}

interface IState {
  hasJoinedClass: boolean

  joinMode: EJoinMode
  classIdToJoin: string
  classNameToCreate: string

  classId: string
  className: string
  classmates: IClassUser[]
}

const TABLIST: ITab[] = [{ title: '已有班级号？' }, { title: '未创建班级？' }]

export default class Class extends Component<{}, IState> {
  static defaultState: IState = {
    hasJoinedClass: false,
    joinMode: EJoinMode.JOIN,
    classIdToJoin: '',
    classNameToCreate: '',
    classId: '',
    className: '',
    classmates: DEFAULT_CLASSMATES
  }

  state: IState = Class.defaultState

  handleTabSwitching (index: number) {
    this.setState({
      joinMode: index as EJoinMode
    })
  }

  handleClassIdInput (classIdToJoin: string) {
    this.setState({ classIdToJoin })
  }

  handleClassNameInput (classNameToCreate: string) {
    this.setState({ classNameToCreate })
  }

  joinClass () {
    const { classIdToJoin } = this.state
    this.setState({
      classIdToJoin,
      hasJoinedClass: true,
      classId: classIdToJoin,
      className: '测试班级'
    })
  }

  createClass () {
    const { classNameToCreate } = this.state
    this.setState({
      classNameToCreate,
      hasJoinedClass: true,
      classId: '测试ID',
      className: classNameToCreate
    })
  }

  leaveClass () {
    Taro.showModal({
      title: '离开',
      content: '确认离开班级？',
      success: res => {
        if (res.confirm) {
          // TODO 远端退出班级
          this.setState({ hasJoinedClass: false })
        }
      }
    })
  }

  shareClass () {
    console.log(this.state.classId)
  }

  render () {
    const { joinMode, ...user } = this.state
    return (
      <View className='class-wrapper'>
        <AtModal
          className='join-class'
          isOpened={!user.hasJoinedClass}
          closeOnClickOverlay={false}
        >
          <AtModalHeader>加入班级</AtModalHeader>
          <AtModalContent>
            <AtTabs
              current={joinMode}
              tabList={TABLIST}
              onClick={this.handleTabSwitching}
            >
              <AtTabsPane current={joinMode} index={EJoinMode.JOIN}>
                <AtInput
                  name='classId'
                  placeholder='要加入的班级号码'
                  onChange={this.handleClassIdInput}
                  value={user.classIdToJoin}
                />
                <AtButton onClick={this.joinClass}>立即加入</AtButton>
              </AtTabsPane>
              <AtTabsPane current={joinMode} index={EJoinMode.CREATE}>
                <AtInput
                  name='className'
                  placeholder='要创建的班级名字'
                  onChange={this.handleClassNameInput}
                  value={user.classNameToCreate}
                />
                <AtButton onClick={this.createClass}>立即创建</AtButton>
              </AtTabsPane>
            </AtTabs>
          </AtModalContent>
        </AtModal>

        <View hidden={!user.hasJoinedClass}>
          <View className='top-view container'>
            <View className='share-button' onClick={this.shareClass}>
              <FontAwesome
                family='solid'
                name='share-alt'
                size={20}
                color='#333'
              />
            </View>
            <View className='avatar'>
              <AtAvatar text='班级' />
            </View>
            <View className='text'>
              <Text className='name'>{user.className}\n</Text>
              <Text className='id'>班级号：{user.classId}\n</Text>
            </View>
            <View className='leave-button'>
              <AtButton size='small' onClick={this.leaveClass}>
                离开班级
              </AtButton>
            </View>
          </View>

          <View className='grid-view container'>
            <AtGrid
              hasBorder={false}
              columnNum={4}
              data={user.classmates.map(classmate => ({
                image: TOMATO_PNG,
                value: classmate.name
              }))}
            />
          </View>
        </View>
      </View>
    )
  }
}
