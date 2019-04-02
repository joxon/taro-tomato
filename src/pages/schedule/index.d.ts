export type TWeekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export type TViewMode = 'TaskView' | 'WeekView'

export interface ITask {
  name: string
  weekday: TWeekday
  startTime: Date
  endTime: Date
  tomatoBonus: number
}

export interface ITab {
  name: string
  viewMode: TViewMode
}

export interface IDay {
  weekdayName: string
  weekday: TWeekday
  date?: string
}
