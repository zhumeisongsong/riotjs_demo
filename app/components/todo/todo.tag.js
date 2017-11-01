import riot from 'riot'
import route from 'riot-route'

export default class Todo {
  constructor(scope, opts) {
    scope.items = opts.items

    scope.edit = (e) => {
      scope.text = e.target.value
    }

    scope.add = (e) => {
      if (scope.text) {
        scope.items.push({title: scope.text})
        scope.text = scope.refs.input.value = ''
      }
      e.preventDefault()
    }

    scope.removeAllDone = (e) => {
      scope.items = scope.items.filter((item) => {
        return !item.done
      })
    }

    scope.whatShow = (item) => {
      return !item.hidden
    }

    scope.onlyDone = (item) => {
      return item.done
    }

    scope.toggle = (e) => {
      const item = e.item
      item.done = !item.done
      return true
    }

  }
}