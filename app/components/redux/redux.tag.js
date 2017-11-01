import riot from 'riot'
import route from 'riot-route'

export default class Redux {
  constructor(scope, opts) {

    scope.on('mount', () => {
      scope.name = scope.store.getState().sampleReducer.name
      scope.update()
    })

    scope.initialize = (e) => {
      // from view  tells store state has changed
      let action = {
        type: 'ACTION',
        payload: new Promise((t, c) => {
          setTimeout(() => {
            //TODO: what is this?
            t()
          }, 1000)
        })
      }

      scope.store.dispatch(action)//view send action
        .then(() => {
          scope.name = scope.store.getState().sampleReducer.name
          scope.update()
        })

    }
  }
}