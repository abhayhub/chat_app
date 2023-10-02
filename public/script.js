//here we creating socket object  by calling io() function which is provided by socket.io/scoket.io.js
var socket = io();

let btn = document.getElementById('btn');

//sending event from client side
btn.onclick = function exec () {
    socket.emit("from client")
}

//here we are listening a event
//you can listen event using socket.on( , () => {});

socket.on('from server', () => {
    console.log("collected a new event from server");
})

