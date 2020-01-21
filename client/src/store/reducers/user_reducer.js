import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  user_text: ''
}

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case ACTION_TYPES.USER_INPUT:
      return {
        ...state,
        user_text: payload
      }
    default:
      return state
  }
}

export default userReducer