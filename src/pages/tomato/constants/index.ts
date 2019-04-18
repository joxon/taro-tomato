import { IRecord } from '../index.d'

export const DEFAULT_RECORD_LIST: IRecord[] = [
  {
    type: 'harvest',
    tomato: 10,
    reason: '完成了【写作业】',
    timestamp: '0'
  },
  {
    type: 'redeem',
    tomato: 10,
    reason: '兑换了【玩电脑一小时】',
    timestamp: '1'
  },
  {
    type: 'punish',
    tomato: 10,
    reason: '因为【睡懒觉】了',
    timestamp: '2'
  },
  {
    type: 'harvest',
    tomato: 10,
    reason: 'good',
    timestamp: '3'
  }
]
