import * as React from 'react'
import { DeleteMessageAction, Message } from '../../store/chat'
import ChatMessage from '../ChatMessage/ChatMessage'

import styles from './ChatHistory.module.css'

interface ChatHistoryProps {
  messages: Message[]
  deleteMessage: typeof DeleteMessageAction.createAction
}

const ChatHistory: React.FunctionComponent<ChatHistoryProps> = ({
  messages,
  deleteMessage
}: ChatHistoryProps) => {
  return (
    <div className={styles.chatHistory}>
      <ul>
        {messages.map(message => (
          <ChatMessage
            key={message.timestamp}
            message={message}
            deleteMessage={deleteMessage}
          />
        ))}
      </ul>
    </div>
  )
}
export default ChatHistory
