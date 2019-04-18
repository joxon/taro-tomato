export type TRecord = 'harvest' | 'redeem' | 'punish'

export interface IRecord {
  type: TRecord
  tomato: number
  reason: string
  timestamp: string
}
