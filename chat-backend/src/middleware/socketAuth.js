import { verifyToken } from "../utils/jwt.js";

export const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error("No token");

    const user = verifyToken(token);
    socket.user = user;
    next();
  } catch {
    next(new Error("Authentication failed"));
  }
};
