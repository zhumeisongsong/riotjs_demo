import riot from 'riot'
import route from 'riot-route'

export default class Timer {
  constructor(scope, opts) {
    scope.time = opts.start || 0

    scope.tick = () => {
      scope.update({time: ++scope.time})
    }

    const timer = setInterval(scope.tick, 1000)

    scope.on('unmount', () => {
      clearInterval(timer)
    })
  }
}