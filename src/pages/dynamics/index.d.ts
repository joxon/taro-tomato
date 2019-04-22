export interface IPost {
  userName: string
  content: string
  timestamp: number
}

export interface IClassUser {
  id?: string
  name: string
}

export interface ITab {
  title: string
}

export type TSex = 'M' | 'F'

export type TSexName = '男' | '女'

export type TAge =
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
