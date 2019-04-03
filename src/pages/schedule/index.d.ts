export type TViewMode = 'TaskView' | 'WeekView'

export type TWeekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

// 考虑到儿童休息，故排除0-5AM
export type THour =
  // | '0AM'
  // | '1AM'
  // | '2AM'
  // | '3AM'
  // | '4AM'
  // | '5AM'
  | '6AM'
  | '7AM'
  | '8AM'
  | '9AM'
  | '10AM'
  | '11AM'
  | '12PM'
  | '1PM'
  | '2PM'
  | '3PM'
  | '4PM'
  | '5PM'
  | '6PM'
  | '7PM'
  | '8PM'
  | '9PM'
  | '10PM'
  | '11PM'

export type TMinute =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45'
  | '46'
  | '47'
  | '48'
  | '49'
  | '50'
  | '51'
  | '52'
  | '53'
  | '54'
  | '55'
  | '56'
  | '57'
  | '58'
  | '59'

export interface ITask {
  name: string

  weekday: TWeekday

  startHour: THour
  startMinute: TMinute

  endHour: THour
  endMinute: TMinute

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
