const express = require('express')
const app = express();
const http = require('http');
const socketio = require('socket.io')
//creating server object and all the feature of app object is available in server object
const server = http.createServer(app);

//we pass server obj into socketio for creating a websocket connection
const io = socketio(server);

//here we are setuping an event called connection
io.on('connection',(socket) => {
    //here we are getting a socket obj
    //and each socket obj has unique id
    console.log('a user connected ' + socket.id);
    
    //listening event from client side
    // socket.on('from client',() => {
    //     console.log("collected a new event from client");
        
    // })

    socket.on('msg_send',(data) => {
        console.log(data);
        //emit a event msg recieved
        io.emit('msg_received',data);
    })

    //sending event from the server
    setInterval(() => {
        socket.emit("from server");
    } ,1000)
});

//middleware that serve a static file
app.use('/',express.static(__dirname + '/public'))

server.listen(3000, () => {
    console.log("server started");
})
