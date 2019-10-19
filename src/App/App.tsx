import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store'

import styles from './App.module.css'

import ChatHistory from '../components/ChatHistory/ChatHistory'
import ChatInterface from '../components/ChatInterface/ChatInterface'

import {
  ChatState,
  DeleteMessageAction,
  SendMessageAction
} from '../store/chat'
import { SystemState, UpdateSystemStateAction } from '../store/system'
import { Messages } from '../remote/messages'
import { ReactElement } from 'react'

import logo from '../assets/logo.svg'

interface AppProps {
  sendMessage: typeof SendMessageAction.createAction
  deleteMessage: typeof DeleteMessageAction.createAction
  updateSystemState: typeof UpdateSystemStateAction.createAction
  chat: ChatState
  system: SystemState
  getMessage: () => void
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>

class App extends React.Component<AppProps> {
  state = {
    message: ''
  }

  componentDidMount(): void {
    // some test calls, obviously these would not be here in a real app:
    this.props.updateSystemState({
      loggedIn: true,
      session: 'my_session',
      userName: 'Foxy Troxy'
    })
    this.props.sendMessage({
      user: 'Chat Bot',
      message:
        'This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.',
      timestamp: new Date().getTime(),
      isMe: false
    })

    this.props.getMessage()
  }

  updateMessage = (event: UpdateMessageParam): void => {
    this.setState({ message: event.currentTarget.value })
  }

  sendMessage = (message: string): void => {
    this.props.sendMessage({
      user: this.props.system.userName,
      message: message,
      timestamp: new Date().getTime(),
      isMe: true
    })
    this.setState({ message: '' })
  }

  render(): ReactElement {
    return (
      <div className={styles.app}>
        <header>
          <div>
            <img src={logo} width={100} alt="React Logo" />{' '}
          </div>
          <div className={styles.title}>Chatux Reactux Typescriptux</div>
        </header>
        <section>
          <ChatHistory
            messages={this.props.chat.messages}
            deleteMessage={this.props.deleteMessage}
          />
        </section>
        <footer>
          <ChatInterface
            userName={this.props.system.userName}
            message={this.state.message}
            updateMessage={this.updateMessage}
            sendMessage={this.sendMessage}
          />
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  chat: state.chat
})

const mapDispatchToProps = {
  sendMessage: SendMessageAction.createAction,
  deleteMessage: DeleteMessageAction.createAction,
  updateSystemState: UpdateSystemStateAction.createAction,
  getMessage: Messages.getMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
