import { observable } from 'mobx'

const store = observable({
  secondsToWork: 25 * 60,
  secondsToRest: 5 * 60
})

export default store
