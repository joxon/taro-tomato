import { ITask, IDay, THour, TMinute } from '../index.d'

export const DEFAULT_TASK: ITask = {
  id: '',
  name: '',
  weekday: 'Mon',
  startHour: '08',
  startMinute: '00',
  endHour: '09',
  endMinute: '00',
  tomatoBonus: 10
}

export const WEEKDAYS: IDay[] = [
  {
    weekdayName: '周一',
    weekday: 'Mon'
  },
  {
    weekdayName: '周二',
    weekday: 'Tue'
  },
  {
    weekdayName: '周三',
    weekday: 'Wed'
  },
  {
    weekdayName: '周四',
    weekday: 'Thu'
  },
  {
    weekdayName: '周五',
    weekday: 'Fri'
  },
  {
    weekdayName: '周六',
    weekday: 'Sat'
  },
  {
    weekdayName: '周日',
    weekday: 'Sun'
  }
]

export const TIME: [THour[], TMinute[]] = [
  [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ],
  [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ]
]
