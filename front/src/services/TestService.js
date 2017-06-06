export function emitMessage(socket, message) {
  socket.emit("message", message);
}

export default emitMessage;
