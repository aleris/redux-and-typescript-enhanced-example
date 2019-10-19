import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { chatReducer } from './chat'
import { systemReducer } from './system'

const rootReducer = combineReducers({
  system: systemReducer,
  chat: chatReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(): Store<AppState> {
  const middlewareList = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewareList)

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  return store
}
