import { Server } from "socket.io";

const socketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    console.log("[app] server intialising");

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`[app] socket connected (ID: ${socket.id})`);

      socket.on("new-input", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });

      socket.on("disconnect", () => {
        console.log(`[app] socket disconnect (ID: ${socket.id})`);
      });
    });
  } else {
    console.log("[app] server already exists!");
  }
  res.end();
};

export default socketHandler;
