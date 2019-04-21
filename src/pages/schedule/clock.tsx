import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { FontAwesome } from 'taro-icons'

import TOMATO_PNG from './images/tomato.png'

import './clock.scss'

interface IProps {
  store: any
}

interface IState {
  seconds: number
  name: string
  tomatoBonus: number
}

interface IPreload {
  name: string
  tomatoBonus: number
}

@inject('store')
@observer class TomatoClock extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '番茄钟'
  }

  static defaultState: IState = {
    seconds: 10,
    name: '加载中...',
    tomatoBonus: 10
  }

  readonly defaultSecondsToWork = 25 * 60
  readonly defaultSecondsToRest = 5 * 60

  state: IState = TomatoClock.defaultState
  preload: IPreload

  componentWillMount () {
    this.preload = this.$router.preload
    const preload: IPreload = this.$router.preload

    const {
      store: { secondsToWork }
    } = this.props

    this.setState({
      seconds: secondsToWork,
      name: preload.name,
      tomatoBonus: preload.tomatoBonus
    })
  }

  componentDidMount () {
    Taro.showModal({
      title: '确认开始？',
      content: '一旦开始就无法暂停哦~确认要开始吗？',
      success: respond => {
        if (respond.confirm) {
          this.startTicking()
        } else {
          Taro.navigateBack()
        }
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.clockHandle)
  }

  clockHandle: NodeJS.Timeout
  isWorking: boolean = true

  stopTicking () {
    clearInterval(this.clockHandle)
    // TODO 提交积分事务

    const {
      store: { secondsToWork, secondsToRest }
    } = this.props

    if (this.isWorking) {
      this.isWorking = false

      Taro.showModal({
        title: '恭喜',
        content: '已经完成了一个番茄钟~要开始下一个番茄钟吗？',
        success: res => {
          if (res.confirm) {
            this.setState(
              {
                seconds: secondsToRest
              },
              () => {
                Taro.showToast({
                  title: '开始之前先休息一下吧~',
                  icon: 'none'
                })
                this.startTicking()
              }
            )
          } else {
            Taro.navigateBack()
          }
        }
      })
    } else {
      this.isWorking = true

      Taro.showModal({
        title: '准备',
        content: '准备开始下一个番茄钟吧~',
        success: res => {
          if (res.confirm) {
            this.setState(
              {
                seconds: secondsToWork
              },
              () => {
                this.startTicking()
              }
            )
          } else {
            Taro.navigateBack()
          }
        }
      })
    }
  }

  startTicking () {
    this.clockHandle = setInterval(() => {
      const { seconds } = this.state
      if (seconds === 0) {
        this.stopTicking()
      } else {
        this.setState({
          seconds: seconds - 1
        })
      }
    }, 1000)
  }

  readonly delta = 2

  handleThumbsUp () {
    const delta = this.delta
    this.setState(
      {
        tomatoBonus: this.state.tomatoBonus + delta
      },
      () => {
        Taro.showToast({
          title: `番茄奖励+${delta}`,
          icon: 'none'
        })
      }
    )
  }

  handleThumbsDown () {
    const { tomatoBonus } = this.state
    const delta = this.delta
    const tomatoBonusAfter = tomatoBonus - delta

    if (tomatoBonusAfter <= 0) {
      Taro.showToast({
        title: `奖励不能再减少了~`,
        icon: 'none'
      })
    } else {
      this.setState(
        {
          tomatoBonus: tomatoBonusAfter
        },
        () => {
          Taro.showToast({
            title: `番茄奖励-${delta}`,
            icon: 'none'
          })
        }
      )
    }
  }

  render () {
    // 以下代码会导致调用栈错误
    // const state = this.state
    const { ...s } = this.state
    const d = this.delta

    const min = String((s.seconds - (s.seconds % 60)) / 60).padStart(2, '0')

    const sec = String(s.seconds % 60).padStart(2, '0')

    return (
      <View className='clock'>
        <View className='info'>
          <View className='name'>{`当前任务：${s.name}`}</View>
          <View className='tomato'>{`番茄奖励：${s.tomatoBonus}`}</View>
        </View>

        <View className='digital'>
          <Text className='min'>{min}</Text>
          <Text className='sec'>:{sec}</Text>
        </View>

        <View className='analog'>
          <Image src={TOMATO_PNG} />
        </View>

        <View className='buttons'>
          <View className='button' onClick={this.handleThumbsUp}>
            <FontAwesome
              family='regular'
              name='thumbs-up'
              size={40}
              color='#ff0000'
            />
            +{d}
          </View>
          <View className='button' onClick={this.handleThumbsDown}>
            <FontAwesome
              family='regular'
              name='thumbs-down'
              size={40}
              color='#ff0000'
            />
            -{d}
          </View>
        </View>
      </View>
    )
  }
}

export default TomatoClock
