import riot from 'riot'
import route from 'riot-route'

export default class Redux {
  constructor(scope, opts) {

    scope.on('mount', () => {
      scope.name = scope.store.getState().sampleReducer.name
      scope.update()
    })

    scope.initialize = (e) => {
      let action = {
        type: 'ACTION',
        payload: new Promise((t, c) => {
          setTimeout(() => {
            t()
          }, 1000)
        })// use AJAX, Axios or other promise execute
      }

      scope.store.dispatch(action).then(() => {
        console.log('Promise executed')
        scope.name = scope.store.getState().sampleReducer.name
        scope.update()
      })

    }
  }
}