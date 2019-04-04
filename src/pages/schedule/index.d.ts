// export type TViewMode = 'TaskView' | 'WeekView'

export type TWeekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

// 考虑到儿童休息，故排除0-5AM
export type THour =
  // | '00 AM'
  // | '01 AM'
  // | '02 AM'
  // | '03 AM'
  // | '04 AM'
  // | '05 AM'
  | '06 AM'
  | '07 AM'
  | '08 AM'
  | '09 AM'
  | '10 AM'
  | '11 AM'
  | '12 PM'
  | '01 PM'
  | '02 PM'
  | '03 PM'
  | '04 PM'
  | '05 PM'
  | '06 PM'
  | '07 PM'
  | '08 PM'
  | '09 PM'
  | '10 PM'
  | '11 PM'

export type TMinute =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
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
  title: string
}

export interface IDay {
  weekdayName: string
  weekday: TWeekday
  date?: string
}
