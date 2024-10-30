import { Socket } from "socket.io";
import { getIO } from "../../socket";

export const join = (socket: Socket, roomId: string) => {
  const io = getIO();
  socket.join(roomId);
  console.debug(`join room: ${roomId}`);
  io.to(roomId).emit("receive", `join room: ${roomId}`);
};

const reload = (roomId: string) => {
  const io = getIO();
  io.to(roomId).emit("reload");
};

export enum notifyTypeEnum {
  ATTEND = "attend",
  LEAVE = "leave",
  ALL_LEAVE = "allLeave",
}

const notify = (roomId: string, type: notifyTypeEnum) => {
  const io = getIO();
  io.to(roomId).emit("notify", type);
};

export const leave = (socket: Socket, roomId: string) => {
  const io = getIO();
  socket.leave(roomId);
  console.debug(`leave room: ${roomId}`);
  io.to(roomId).emit("receive", `leave room: ${roomId}`);
};

export const socketStatusReload = () => {
  console.debug("[Socket] user_status: reload");
  reload("user_status");
};

export const socketStatusNotify = (type: notifyTypeEnum) => {
  console.debug("[Socket] user_status_notify");
  notify("user_status_notify", type);
};
