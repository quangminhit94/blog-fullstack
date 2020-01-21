
import AuthReducer from './auth_reducer';
import UserReducer from './user_reducer';
import PostReducer from './post_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
  user_reducer: UserReducer,
  post_reducer: PostReducer 
})

export default rootReducer