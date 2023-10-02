const express = require('express')
const http = require('http');
const connect = require('./config/database-config');
const Chat = require('./models/chat.js');
const socketio = require('socket.io')

const app = express();
//creating server object and all the feature of app object is available in server object
const server = http.createServer(app);
//we pass server obj into socketio for creating a websocket connection
const io = socketio(server);

//here we are setuping an event called connection
io.on('connection',(socket) => {
     socket.on('join_room',(data) => {
        console.log("joining a room", data.roomid)
        socket.join(data.roomid);
     });
     
    //here we are getting a socket obj
    //and each socket obj has unique id
    // console.log('a user connected ' + socket.id);
    
    //listening event from client side
    // socket.on('from client',() => {
    //     console.log("collected a new event from client");
        
    // })
    

    //emit a event msg recieved
    socket.on('msg_send', async (data) => {
        //sending data to database
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg 
        })
        io.to(data.roomid).emit('msg_received',data);
    });
});

//setup view enginer using ejs (embedded js template)
//using this you can embade js inside html;
app.set('view engine','ejs');

//middleware that serve a static file
app.use('/',express.static(__dirname + '/public'));

app.get('/chat/:roomid',async (req,res) => {

    const chats = await Chat.find({
        roomId: req.params.roomid
    });
    res.render('index',{
        name : 'Abhay',
        id : req.params.roomid,
        chats: chats
    });
})

server.listen(3000, async () => {
    console.log("server started");
    await connect();
    console.log("mongodb connected");
})
