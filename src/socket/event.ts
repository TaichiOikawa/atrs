import { getIO } from "../socket";
import { join } from "./events/room";

export const event = () => {
  const io = getIO();
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("check", () => {
      const checkMessage = "connection is ok";
      console.log(checkMessage);
      io.emit("check", checkMessage);
    });

    socket.on("join", (roomId: string) => {
      join(socket, roomId);
      console.log(`join room: ${roomId}`);
      io.to(roomId).emit("message", `join room: ${roomId}`);
    });

    socket.on("message", (msg) => {
      console.log("message from client:", msg);
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("user disconnected");
    });
  });
};

// 毎秒メッセージを送信 test
export const intervalMessage = () => {
  const io = getIO();
  let count = 0;
  setInterval(() => {
    io.emit("message", `message ${count++}`);
  }, 1000);
};
