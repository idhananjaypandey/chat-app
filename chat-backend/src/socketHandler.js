const onlineUsers = new Set();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    const username = socket.user.username;

    // ✅ online users
    onlineUsers.add(username);
    io.emit("onlineUsers", [...onlineUsers]);

    // ✅ RECEIVE MESSAGE FROM CLIENT
    socket.on("sendMessage", (data) => {
      console.log("📩 Message received:", data);

      // 🔁 broadcast message to everyone
      io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(username);
      io.emit("onlineUsers", [...onlineUsers]);
    });
  });
};
