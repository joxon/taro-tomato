import { THour, TMinute } from '../index.d'

export function parseHourToString (hour: THour): string {
  const hour24 = parseInt(hour, 10)
  return hour24 < 6
    ? `凌晨 ${hour24}`
    : hour24 < 12
      ? `上午 ${hour24}`
      : hour24 === 12
        ? '下午 12'
        : hour24 <= 17
          ? `下午 ${hour24 - 12}`
          : `晚上 ${hour24 - 12}`
}

/* eslint-disable import/export */
export function parseTimeToNumber(time: {
hour: THour
minute: TMinute
}): number
export function parseTimeToNumber(time: string): number
export function parseTimeToNumber (
  time: { hour: THour; minute: TMinute } | string
): number {
  if (typeof time === 'object') {
    const hh = parseInt(time.hour, 10) * 100
    const mm = parseInt(time.minute, 10)
    return hh + mm
  } else if (typeof time === 'string') {
    const t = time.split(':').join('')
    return parseInt(t, 10)
  } else {
    return -1
  }
}
