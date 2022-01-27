const app = require('express')()
const httpServer = require("http").createServer(app);
const socketIO = require("socket.io")(httpServer);
socketIO.on("connection", socket => {
    console.log(socket);
    const chatID = socket.handshake.query.chatID;
    socket.join(chatID);


  socket.on("disconnect",  () => {
    socket.leave(chatID)
    // console.log("disconnect", socket.id);
  });

  socket.on("message", messgae => {
    receiverChatID = messgae.receiverChatID;
    senderChatID = messgae.senderChatID;
    socket.leave(chatID);
    content = messgae.content;

     //Send message to only that particular room
     socket.in(receiverChatID).emit('receiver_message',{
      'content': content,
      'senderChatID': senderChatID,
      'receiverChatID':receiverChatID,
     })

    // console.log("disconnect", socket.id);
  });

  socket.on("error", function (err) {
    console.log(err);
    console.log("error detected", socket.id);
  });
});

var port = process.env.PORT || 3000;
httpServer.listen(port, function (err) {
    if (err) console.log(err);
    console.log('Listening on port', port);
});