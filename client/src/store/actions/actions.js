import * as ACTION_TYPES from './action_types'

export const success = () => {
	return {
		type: ACTION_TYPES.SUCCESS
	}
}

export const failure = () => {
	return {
		type: ACTION_TYPES.FAILURE
	}
}

export const userInput = () => {
	return {
		type: ACTION_TYPES.USER_INPUT
	}
}

export const loginSuccess = () => {
	return {
		type: ACTION_TYPES.LOGIN_SUCCESS
	}
}

export const loginFailure = () => {
	return {
		type: ACTION_TYPES.LOGIN_FAILURE
	}
}

export const addProfile = () => {
	return {
		type: ACTION_TYPES.ADD_PROFILE
	}
}

export const removeProfile = () => {
	return {
		type: ACTION_TYPES.REMOVE_PROFILE
	}
}

export const setDbProfile = () => {
	return {
		type: ACTION_TYPES.SET_DB_PROFILE
	}
}

export const removeDbProfile = () => {
	return {
		type: ACTION_TYPES.REMOVE_DB_PROFILE
	}
}

export const fetchDbPosts = () => {
	return {
		type: ACTION_TYPES.FETCH_DB_POSTS
	}
}

export const removeDbPosts = () => {
	return {
		type: ACTION_TYPES.REMOVE_DB_POSTS
	}
}

export const removeDbPosts = () => {
	return {
		type: ACTION_TYPES.REMOVE_DB_POSTS
	}
}

export const fetchPostComments = () => {
	return {
		type: ACTION_TYPES.FETCH_POST_COMMENTS
	}
}

export const removePostComments = () => {
	return {
		type: ACTION_TYPES.REMOVE_POST_COMMENTS
	}
}