import { Socket } from "socket.io";
import { getIO } from "../../socket";

export const join = (socket: Socket, roomId: string) => {
  const io = getIO();
  socket.join(roomId);
  console.log(`join room: ${roomId}`);
  io.to(roomId).emit("receive", `join room: ${roomId}`);
};

export const message = (
  socket: Socket,
  data: { roomId: string; message: string }
) => {
  const io = getIO();
  const message = `Message { roomId: ${data.roomId}, message: ${data.message} }`;
  console.log(message);
  io.to(data.roomId).emit("receive", message);
};
