import { getIO } from "../socket";
import { join, leave } from "./events/room";

export const event = () => {
  const io = getIO();
  io.on("connection", (socket) => {
    console.debug("a user connected");

    socket.on("check", () => {
      const checkMessage = "connection is ok";
      console.debug(checkMessage);
      io.emit("check", checkMessage);
    });

    socket.on("join", (roomId: string) => {
      join(socket, roomId);
      console.debug(`join room: ${roomId}`);
      io.to(roomId).emit("message", `join room: ${roomId}`);
    });

    socket.on("leave", (roomId: string) => {
      leave(socket, roomId);
      console.debug(`leave room: ${roomId}`);
      io.to(roomId).emit("message", `leave room: ${roomId}`);
    });

    socket.on("message", (msg) => {
      console.debug("message from client:", msg);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.debug("user disconnected");
    });
  });
};
