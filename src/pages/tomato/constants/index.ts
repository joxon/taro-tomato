import { IRecord, IListItem } from '../index.d'

export const DEFAULT_RECORDS: IRecord[] = [
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

export const DEFAULT_REWARD_ITEMS: IListItem[] = [
  {
    name: '玩电脑一小时',
    tomato: -10
  },
  {
    name: '看电视一小时',
    tomato: -10
  }
]

export const DEFAULT_DAILY_ITEMS: IListItem[] = [
  {
    name: '睡懒觉',
    tomato: -10
  },
  {
    name: '闹脾气',
    tomato: -10
  },
  {
    name: '考试第一名',
    tomato: 10
  }
]
