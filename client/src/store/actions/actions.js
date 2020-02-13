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

export const userInput = (payload) => {
	return {
		type: ACTION_TYPES.USER_INPUT,
		payload
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

export const addProfile = (payload) => {
	return {
		type: ACTION_TYPES.ADD_PROFILE,
		payload
	}
}

export const removeProfile = () => {
	return {
		type: ACTION_TYPES.REMOVE_PROFILE
	}
}

export const setDbProfile = (payload) => {
	return {
		type: ACTION_TYPES.SET_DB_PROFILE,
		payload
	}
}

export const removeDbProfile = () => {
	return {
		type: ACTION_TYPES.REMOVE_DB_PROFILE
	}
}

export const fetchDbPosts = (payload) => {
	return {
		type: ACTION_TYPES.FETCH_DB_POSTS,
		payload
	}
}

export const removeDbPosts = () => {
	return {
		type: ACTION_TYPES.REMOVE_DB_POSTS
	}
}

export const fetchUserPosts = (payload) => {
	return {
		type: ACTION_TYPES.FETCH_USER_POSTS,
		payload
	}
}

export const removeUserPosts = () => {
	return {
		type: ACTION_TYPES.REMOVE_USER_POSTS
	}
}

export const fetchPostComments = (payload) => {
	return {
		type: ACTION_TYPES.FETCH_POST_COMMENTS,
		payload
	}
}

export const removePostComments = () => {
	return {
		type: ACTION_TYPES.REMOVE_POST_COMMENTS
	}
}