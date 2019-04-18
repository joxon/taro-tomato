import { IRecord } from '../index.d'

export function toTitleString (record: IRecord): string {
  let title = ''
  switch (record.type) {
    case 'harvest':
      title = `收获 +${record.tomato}番茄`
      break
    case 'punish':
      title = `惩罚 -${record.tomato}番茄`
      break
    case 'redeem':
      title = `兑换 -${record.tomato}番茄`
      break
    default:
      break
  }
  return title
}
