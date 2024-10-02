import { Socket } from "socket.io";
import { getIO } from "../../socket";

export const join = (socket: Socket, roomId: string) => {
  const io = getIO();
  socket.join(roomId);
  console.debug(`join room: ${roomId}`);
  io.to(roomId).emit("receive", `join room: ${roomId}`);
};

export const reload = (roomId: string) => {
  const io = getIO();
  io.to(roomId).emit("reload");
};

export const leave = (socket: Socket, roomId: string) => {
  const io = getIO();
  socket.leave(roomId);
  console.debug(`leave room: ${roomId}`);
  io.to(roomId).emit("receive", `leave room: ${roomId}`);
};
