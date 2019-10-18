import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css'

import App from './App/App'
import { SendMessageAction } from './store/chat'

const store = configureStore()

setTimeout(() => {
  store.dispatch(
    SendMessageAction.createAction({
      user: 'Their Name',
      message: 'What do you think about react, redux or typescript?',
      timestamp: new Date().getTime(),
      isMe: false
    })
  )
}, 5555)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<Root />, document.getElementById('root'))
