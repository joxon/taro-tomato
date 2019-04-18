import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

import { IRecord } from '../../index.d'

import './index.scss'
import { toTitleString } from '../../utils'

interface IProps {
  records: IRecord[]
}

export default class ListView extends Component<IProps, {}> {
  static defaultProps: IProps = {
    records: []
  }

  render () {
    return (
      <View className='list-view'>
        <AtList>
          {this.props.records.map(record => (
            <AtListItem
              key={record.timestamp}
              title={toTitleString(record)}
              note={record.reason}
              extraText={record.timestamp}
            />
          ))}
        </AtList>
      </View>
    )
  }
}
