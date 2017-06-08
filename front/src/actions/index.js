import * as types from '../types';

// Socket
export function socket_connect() {
  return { type: types.SOCKET_CONNECT };
}

export const socket_emit = (message) => ({
  type: types.SOCKET_EMIT,
  message: message
})

export const socket_login = (pseudo) => ({
  type: types.SOCKET_LOGIN,
  pseudo: pseudo
})

export const socket_change_video = () => ({
  type: types.SOCKET_CHANGE_VIDEO
})

export const socket_answer = (val) => ({
  type: types.SOCKET_ANSWER,
  val
})

// App
export const login = (user) => ({
  type: types.LOGIN,
  response: user
})

export const change_video = (video) => ({
  type: types.CHANGE_VIDEO,
  video: video
})

export const end_video = () => ({
  type: types.END_VIDEO
})

export const answer = (result) => ({
  type: types.ANSWER,
  result
})

export const update_user = (user) => ({
  type: types.UPDATE_USER,
  response: user
})
