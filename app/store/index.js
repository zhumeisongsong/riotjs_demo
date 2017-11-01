import riot from 'riot'
import {
  combineReducers,
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import sampleReducer from './modules/sample/reducer'

const reducers = combineReducers({
  sampleReducer
})

const middleware = applyMiddleware(
  thunk,
  promise()
)

const store = createStore(
  reducers,//accept reducers as param
  compose(middleware)
)

store.subscribe(()=>{
  riot.update()
})

export default {
  store:store
}