import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import apiBaseUrl from "./config/front.config";

let io: SocketIOServer;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: apiBaseUrl,
      credentials: true,
      optionsSuccessStatus: 200,
    },
    transports: ["websocket", "polling"],
  });
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
