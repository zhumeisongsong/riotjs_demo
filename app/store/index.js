import riot from 'riot'
import {
  combimeReducers,
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import sampleReducer from './modules/sample/reducer'

const reducers = combimeReducers({
  sampleReducer
})

const middleware = applyMiddleware(
  thunk,
  promise()
)

const store = createStore(
  reducers,
  compose(middleware)
)

store.subscribe(()=>{
  riot.update()
})

export default {
  store:store
}