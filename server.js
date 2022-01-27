const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log(socket.id)
  console.log("a user connected");
  
});
io.on('test',(socket) => {
  console.log(">>>>>>>>")
  console.log("a user connected");
});
server.listen(process.env.PORT || 9997, () => {
  console.log(`listening on *: ${process.env.PORT}`);
});
