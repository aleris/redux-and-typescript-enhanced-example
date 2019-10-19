import * as React from 'react'
import { DeleteMessageAction, Message } from '../../store/chat'

import styles from './ChatHistory.module.css'

import bot from '../../assets/bot.png'
import fox from '../../assets/fox.png'

interface ChatHistoryProps {
  messages: Message[]
  deleteMessage: typeof DeleteMessageAction.createAction
}

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

function formatTimestamp(timestamp: number): string {
  return dateTimeFormat.format(timestamp)
}

const ChatHistory: React.FunctionComponent<ChatHistoryProps> = ({
  messages,
  deleteMessage
}: ChatHistoryProps) => {
  return (
    <div className={styles.chatHistory}>
      <ul>
        {messages.map(message => (
          <li
            className={message.isMe ? styles.you : styles.other}
            key={message.timestamp}
          >
            <div className={styles.user} title={message.user}>
              <img src={message.isMe ? fox : bot} alt={message.user} />
            </div>
            <div className={styles.date}>
              {formatTimestamp(message.timestamp)}
            </div>
            <div className={styles.message}>
              <p>{message.message}</p>
              <button
                onClick={(): DeleteMessageAction =>
                  deleteMessage(message.timestamp)
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatHistory
