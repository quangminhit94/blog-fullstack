import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  user_text: 'test'
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case ACTION_TYPES.USER_INPUT:
      return {
        ...state,
        user_text: payload
      }
    case ACTION_TYPES.SET_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        other_user_db_profile: payload
      }
    case ACTION_TYPES.REMOVE_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        other_user_db_profile: null
      }
    case ACTION_TYPES.SET_OTHER_USER_DB_POSTS:
      return {
        ...state,
        db_other_user_posts: payload
      }
    case ACTION_TYPES.REMOVE_OTHER_USER_DB_POSTS:
      return {
        ...state,
        db_other_user_posts: []
      }
    default:
      return state
  }
}

export default userReducer