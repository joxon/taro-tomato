import { THour } from '../index.d'

const parseHour: (hour: THour) => string = hour => {
  const hour24 = parseInt(hour, 10)
  return hour24 < 12
    ? `上午 ${hour24}`
    : hour24 === 12
      ? '下午 12'
      : hour24 <= 17
        ? `下午 ${hour24 - 12}`
        : `晚上 ${hour24 - 12}`
}

export default parseHour
