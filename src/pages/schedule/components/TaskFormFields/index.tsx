import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'

export default class TaskForm extends Component {
  state = {
    value: ''
  }
  handleChange (value: any) {
    this.setState({
      value
    })
  }

  render () {
    return (
      <View>
        <AtInput
          name='value'
          title='文本'
          type='text'
          placeholder='单行文本'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </View>
    )
  }
}
