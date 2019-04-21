import Taro, { Component, Config } from '@tarojs/taro'
import { View, Label } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtButton, AtForm, AtInput, AtInputNumber } from 'taro-ui'

import { IListItem } from './index.d'

type TEditMode = 'add' | 'edit'
type TItemMode = 'reward' | 'daily'

interface IState {
  editMode: TEditMode
  itemMode: TItemMode
  id?: string
  name: string
  tomato: number
}

export default class TomatoItem extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '表项详情'
  }

  static defaultState: IState = {
    editMode: 'add',
    itemMode: 'daily',
    name: '',
    tomato: 10
  }

  state: IState = TomatoItem.defaultState

  componentWillMount () {
    this.setState({
      ...this.$router.preload
    })
  }

  onSubmit (event: CommonEvent) {
    console.log(event)
    console.log(this.state)
  }

  onReset (event: CommonEvent) {
    console.log(event)
    this.setState({
      name: '',
      tomato: 10
    })
  }

  handleNameInput (name: string) {
    this.setState({ name })
  }

  handleTomatoInputNumber (tomato: number) {
    if (this.state.itemMode === 'reward') {
      this.setState({
        tomato: -Math.abs(tomato)
      })
    } else {
      this.setState({
        tomato
      })
    }
  }

  recordItem (item: IListItem) {
    console.log('TCL: ------------------------------------------')
    console.log('TCL: TomatoItem -> recordItem -> item', item)
    console.log('TCL: ------------------------------------------')
  }

  render () {
    const { editMode, itemMode, ...item } = this.state

    const { itemType, itemVerb } =
      itemMode === 'daily'
        ? { itemType: '奖惩', itemVerb: '记录' }
        : { itemType: '奖励', itemVerb: '兑换' }

    const itemNameInput = (
      <AtInput
        name='itemName'
        title={itemType + '名称'}
        type='text'
        placeholder='起个名字吧~'
        value={item.name}
        onChange={this.handleNameInput}
      />
    )

    const itemTomatoInputNumber = (
      <View className='at-input'>
        <View className='at-input__container'>
          <Label className='at-input__title'>
            {itemMode === 'daily' ? '番茄奖惩' : '番茄消耗'}
          </Label>
          <AtInputNumber
            className='at-input__input'
            type='digit'
            min={itemMode === 'daily' ? -100 : 10}
            max={100}
            step={5}
            value={itemMode === 'daily' ? item.tomato : Math.abs(item.tomato)}
            onChange={this.handleTomatoInputNumber}
          />
        </View>
      </View>
    )

    const buttons =
      editMode === 'add' ? (
        <View>
          <AtButton type='primary' formType='submit'>
            添加{itemType}
          </AtButton>
          <AtButton type='secondary' formType='reset'>
            重新填写
          </AtButton>
        </View>
      ) : (
        <View>
          <AtButton type='primary' formType='submit'>
            保存{itemType}
          </AtButton>
          <AtButton type='secondary' onClick={this.recordItem.bind(this, item)}>
            {itemVerb + itemType}
          </AtButton>
          <AtButton type='secondary'>删除{itemType}</AtButton>
        </View>
      )

    return (
      <AtForm
        className='form'
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        {itemNameInput}
        {itemTomatoInputNumber}
        {buttons}
      </AtForm>
    )
  }
}
