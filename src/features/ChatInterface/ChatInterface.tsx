import * as React from 'react'
import { UpdateMessageParam } from '../../App/App'

import styles from './ChatInterface.module.css'

interface ChatInterfaceProps {
  message: string
  userName: string
  sendMessage: (message: string) => void
  updateMessage: (event: UpdateMessageParam) => void
}

const ChatInterface: React.FunctionComponent<ChatInterfaceProps> = ({
  userName,
  message,
  updateMessage,
  sendMessage
}: ChatInterfaceProps) => {
  function callSendMessage(): void {
    sendMessage(message)
  }

  function sendMessageOnKeyPress(
    e: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (e.key === 'Enter') {
      callSendMessage()
    }
  }

  return (
    <div className={styles.chatInterface}>
      <input
        value={message}
        onChange={updateMessage}
        onKeyPress={sendMessageOnKeyPress}
        placeholder="Type a message..."
      />
      <button onClick={callSendMessage}>Send</button>
    </div>
  )
}

export default ChatInterface
