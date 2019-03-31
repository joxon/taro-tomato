export type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export type ViewMode = 'TaskView' | 'WeekView'

export interface ITask {
  name: string
  weekday: Weekday
  startTime: Date
  endTime: Date
  tomatoBonus: number
}

export interface ITab {
  name: string
  viewMode: ViewMode
}
