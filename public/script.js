//here we creating socket object  by calling io() function which is provided by socket.io/scoket.io.js
var socket = io();

let btn = document.getElementById('btn');

let inputmsg = document.getElementById('newmsg');
let msglist = document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msg_send',{
        msg : inputmsg.value
    });
}


socket.on('msg_received', (data) => {
    let lismsg = document.createElement('li');
    lismsg.innerText = data.msg;
    msglist.appendChild(lismsg);
})

// //sending event from client side
// btn.onclick = function exec () {
//     socket.emit("from client")
// }

// //here we are listening a event
// //you can listen event using socket.on( , () => {});

// socket.on('from server', () => {
//     console.log("collected a new event from server");
// })

