import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { SendMessageAction } from '../store/chat'

interface GetMessageAPIResponse {
  user: string
  message: string
}

export abstract class Messages {
  static _getMessageAPI(): Promise<GetMessageAPIResponse> {
    return Promise.resolve({
      user: 'Async Chat Bot',
      message: 'This message was sent by a thunk!'
    })
  }

  static getMessage(): ThunkAction<void, AppState, null, SendMessageAction> {
    return async dispatch => {
      const exampleAPIResponse = await Messages._getMessageAPI()
      dispatch(
        SendMessageAction.createAction({
          user: exampleAPIResponse.user,
          message: exampleAPIResponse.message,
          timestamp: new Date().getTime(),
          isMe: false
        })
      )
    }
  }
}
