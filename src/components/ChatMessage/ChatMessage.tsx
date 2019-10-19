import * as React from 'react'
import { DeleteMessageAction, Message } from '../../store/chat'

import styles from './ChatMessage.module.css'

import fox from '../../assets/fox.png'
import bot from '../../assets/bot.png'

interface MessageProps {
  message: Message
  deleteMessage: typeof DeleteMessageAction.createAction
}

const MESSAGE_TIME_FORMAT = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

const ChatMessage: React.FunctionComponent<MessageProps> = ({
  message,
  deleteMessage
}: MessageProps) => {
  function formatTimestamp(timestamp: number): string {
    return MESSAGE_TIME_FORMAT.format(timestamp)
  }

  return (
    <li
      className={message.isMe ? styles.you : styles.other}
      key={message.timestamp}
    >
      <div className={styles.user} title={message.user}>
        <img src={message.isMe ? fox : bot} alt={message.user} />
      </div>
      <div className={styles.date}>{formatTimestamp(message.timestamp)}</div>
      <div className={styles.message}>
        <p>{message.message}</p>
        <button
          onClick={(): DeleteMessageAction => deleteMessage(message.timestamp)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default ChatMessage
