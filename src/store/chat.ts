import { Action } from 'redux'

/**
 * State and data model types
 */
export interface Message {
  user: string
  message: string
  timestamp: number
  isMe: boolean
}

export interface ChatState {
  messages: Message[]
}

/**
 * Send message action
 */
export abstract class SendMessageAction implements Action<string> {
  static readonly _TYPE = 'SendMessageAction'

  static _reduce(state: ChatState, action: SendMessageAction): ChatState {
    return {
      messages: [...state.messages, action.newMessage]
    }
  }

  static createAction(newMessage: Message): SendMessageAction {
    return {
      type: SendMessageAction._TYPE,
      newMessage
    }
  }

  abstract readonly type: string
  abstract readonly newMessage: Message
}

/**
 * Delete message action
 */
export abstract class DeleteMessageAction implements Action<string> {
  static readonly _TYPE = 'DeleteMessageAction'

  static _reduce(state: ChatState, action: DeleteMessageAction): ChatState {
    return {
      messages: state.messages.filter(
        message => message.timestamp !== action.meta.timestamp
      )
    }
  }

  static createAction(timestamp: number): DeleteMessageAction {
    return {
      type: DeleteMessageAction._TYPE,
      meta: {
        timestamp
      }
    }
  }

  abstract readonly type: string
  abstract readonly meta: {
    timestamp: number
  }
}

/**
 * Initial chat state
 */
const initialState: ChatState = {
  messages: []
}

/**
 * Union of chat actions
 */
type ChatActionTypes = SendMessageAction | DeleteMessageAction

/**
 * Reducer for all chat actions
 * @param state
 * @param action
 */
export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case SendMessageAction._TYPE:
      return SendMessageAction._reduce(state, action as SendMessageAction)
    case DeleteMessageAction._TYPE:
      return DeleteMessageAction._reduce(state, action as DeleteMessageAction)
    default:
      return state
  }
}
