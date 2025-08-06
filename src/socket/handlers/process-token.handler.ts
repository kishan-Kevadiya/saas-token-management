import { type Namespace, type Server, type Socket } from 'socket.io';
export function processTokenSocketHandlers(
  nsp: Namespace,
  io: Server,
  socket: Socket
) {
  socket.on('counter', async (data, callback) => {
    const token = []
  });
}
