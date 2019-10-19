import { Action } from 'redux'

/**
 * State and data model types
 */
export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
}

/**
 * Update system state action
 */
export abstract class UpdateSystemStateAction implements Action<string> {
  static readonly _TYPE = 'UpdateSystemStateAction'

  static _reduce(
    state: SystemState,
    action: UpdateSystemStateAction
  ): SystemState {
    return {
      ...state,
      ...action.newSystemState
    }
  }

  static createAction(newSystemState: SystemState): UpdateSystemStateAction {
    return {
      type: UpdateSystemStateAction._TYPE,
      newSystemState: newSystemState
    }
  }

  abstract readonly type: string
  abstract readonly newSystemState: SystemState
}

/**
 * Initial system state
 */
const initialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: ''
}

/**
 * Union of system actions
 */
type SystemActionTypes = UpdateSystemStateAction

/**
 * Reducer for all system actions
 * @param state
 * @param action
 */
export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case UpdateSystemStateAction._TYPE:
      return UpdateSystemStateAction._reduce(
        state,
        action as UpdateSystemStateAction
      )
    default:
      return state
  }
}
