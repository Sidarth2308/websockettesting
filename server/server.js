const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const {getClients,addClient, addVendor, removeClient, removeVendor, getClient, getVendor, getVendors} =require("./users.js");


const app = express();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket)=>{
    console.log("Client Joined : ", socket.id);
    socket.on("client-join", ({name})=>{
      console.log(name);
      const {client} = addClient({id : socket.id,name});
    })
    socket.on("vendor-join", ({name})=>{
      const {client} = addVendor({id : socket.id,name});
    })
    socket.on("user-request",()=>{
      const client = getClient(socket.id);
      console.log(client);
      console.log(getClients());
      socket.broadcast.emit("user-request",client);
    });
    socket.on("vendor-accept-request",(message,)=>{
      const vendor = getVendor(socket.id);
      console.log(message.client);
      io.to(message.client).emit("vendor-accept-request",vendor);
    });
    socket.on("disconnect", ()=>{
        console.log("Client Disconnected : ",socket.id);
    })
})


server.listen(PORT, ()=> console.log("Server running on port : ",PORT));