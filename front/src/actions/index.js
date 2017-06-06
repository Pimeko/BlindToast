import * as types from '../types';

export function socket_connect() {
  return { type: types.SOCKET_CONNECT };
}

export const socket_emmit = (message) => ({
  type: types.SOCKET_EMMIT,
  message: message
})

export const socket_login = (pseudo) => ({
  type: types.SOCKET_LOGIN,
  pseudo: pseudo
})

export const login = (pseudo) => ({
  type: types.LOGIN,
  pseudo: pseudo
})
