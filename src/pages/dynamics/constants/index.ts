import { IPost, TAge, TSex, TSexName, IClassUser } from '../index.d'

export const DEFAULT_POSTS: IPost[] = [
  {
    userName: '张大茄',
    content: '完成了【写作业】，耗时60分钟',
    timestamp: 0
  },
  {
    userName: '陈小茄',
    content: '完成了【写作业】，耗时50分钟',
    timestamp: 1
  },
  {
    userName: '陈小茄',
    content: '完成了【写作业】，耗时60分钟',
    timestamp: 2
  },
  {
    userName: '陈小茄',
    content: '完成了【做家务】',
    timestamp: 3
  },
  {
    userName: '陈小茄',
    content: '完成了【读书】',
    timestamp: 4
  }
]

export const SEXES: TSex[] = ['M', 'F']

export const SEXNAMES: TSexName[] = ['男', '女']

export const AGES: TAge[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15'
]

export const MINUTES_TO_REST: number[] = [3, 4, 5, 6]

export const MINUTES_TO_WORK: number[] = [15, 20, 25, 30]

export const DEFAULT_CLASSMATES: IClassUser[] = [
  {
    id: '0',
    name: '小番茄用户'
  },
  {
    id: '1',
    name: '小番茄用户'
  },
  {
    id: '2',
    name: '小番茄用户'
  },
  {
    id: '3',
    name: '小番茄用户'
  },
  {
    id: '4',
    name: '小番茄用户'
  },
  {
    id: '5',
    name: '小番茄用户'
  },
  {
    id: '6',
    name: '小番茄用户'
  },
  {
    id: '7',
    name: '小番茄用户'
  },
  {
    id: '8',
    name: '小番茄用户'
  }
]
