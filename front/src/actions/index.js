import * as types from '../types';

export function increment() {
  return { type: types.TEST_INCREMENT };
}

export const change_maximilien = (new_value) => ({
  type: types.CHANGE_MAXIMILIEN,
  new_value
})

export function connect_to_socket() {
  return { type: types.SOCKET_CONNECT };
}

export const socket_emmit = (message) => ({
  type: types.SOCKET_EMMIT,
  message: message
})
