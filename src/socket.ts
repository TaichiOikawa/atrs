import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import corsOptions from "./config/front.config";

let io: SocketIOServer;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new SocketIOServer(httpServer, {
    cors: corsOptions,
    transports: ["websocket", "polling"],
  });
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
